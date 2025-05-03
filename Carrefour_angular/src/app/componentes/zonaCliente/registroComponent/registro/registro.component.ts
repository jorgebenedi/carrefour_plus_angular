// ========================== IMPORTACIONES NECESARIAS ==========================
// Solo se añaden al @Component las que se necesiten para el funcionamiento
import { JsonPipe, NgClass } from '@angular/common';
import { Component, effect, inject, Injector, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RestClientService } from '../../../../servicios/rest-client.service';
import * as Validadores from '../../../../validators/validatorPatterns';
import { HTTP_INJECTIONTOKEN_STORAGE_SVCS } from '../../../../app.config';


// ========================== TIPADO PARA EL FORMULARIO ==========================
type IDatosForm = {
  nombre?: string,
  apellidos?: string,
  telefono?: string,
  dninif?: string,
  tipoDocumento?: string,
  email?: string,
  password?: string,
  repassword?: string,
  cp?: string
}


// ========================== DECORADOR DEL COMPONENTE ==========================
@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterModule, JsonPipe, NgClass],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})


// ========================== DEFINICIÓN DE LA CLASE ==========================
export class RegistroComponent {

  // --------------------- PROPIEDADES DEL COMPONENTE ---------------------
  passVisible = signal<boolean>(false);
  repassVisible = signal<boolean>(false);
  formRegistro: FormGroup;
  valoresFormRegistro: Signal<IDatosForm>;
  mensajeError = signal<string>('');
  verValidaciones: boolean = false;
  passwordErrors = {
    longitud: true,
    mayusMinus: true,
    numero: true,
    caracterEspecial: true
  };


  // --------------------- INYECCIÓN DE SERVICIOS ---------------------
  private _injector = inject(Injector);
  private _restService: RestClientService = inject(RestClientService);
  private _storageGlobal = inject(HTTP_INJECTIONTOKEN_STORAGE_SVCS);
  private _router: Router = inject(Router);


  // ========================== CONSTRUCTOR ==========================
  constructor() {

    // ---------- INICIALIZACIÓN DEL FORMULARIO ----------
    this.formRegistro = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(3),
        Validadores.apellidosValidator
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validadores.telefonoValidator
      ]),
      tipoDocumento: new FormControl('DNI', [
        Validators.required
      ]),
      dninif: new FormControl('', [
        Validators.required,
        Validadores.dninifValidator
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validadores.emailValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        Validadores.passwordValidator
      ]),
      repassword: new FormControl('', [
        Validators.required
      ]),
      cp: new FormControl('', [
        Validadores.cpValidator
      ])
    }, { validators: Validadores.passwordsIgualesValidator });


    // ---------- CONVERSIÓN DE OBSERVABLE A SIGNAL ----------
    this.valoresFormRegistro = toSignal(this.formRegistro.valueChanges);
  }


  // ========================== MÉTODOS ==========================

  // ---------- VALIDACIÓN DE CONTRASEÑA PERSONALIZADA ----------
  VerValidaciones(): void {
    const passwordControl = this.formRegistro.get('password');
    const value = passwordControl?.value ?? '';
    console.log('Estado del formulario:', this.formRegistro.valid);

    this.passwordErrors = {
      longitud: !(value.length >= 8 && value.length <= 40),
      mayusMinus: !(/[a-z]/.test(value) && /[A-Z]/.test(value)),
      numero: !/\d/.test(value),
      caracterEspecial: !/[!@#$%^&*(),.?":{}|<>]/.test(value)
    };

    this.verValidaciones = true;
  }

  // ---------- ENVÍO DEL FORMULARIO Y LLAMADA AL SERVICIO ----------
  RegistrarCliente($event: any) {
    console.log('metodo disparado por directiva formGroup q provoca submit del <form...>, los datos del evento son: ', $event);
    console.log('los datos del formulario son: ', this.formRegistro.value);

    const _resp = this._restService.LoginRegistroCliente(this.valoresFormRegistro(), 'Registro');

    effect(() => {
      console.log('respuesta del server al servicio en registro...', _resp());

      if (_resp().codigo === 0) {
        this._storageGlobal.setCodigoVerificacion(_resp().datos.codigo);
        this._storageGlobal.setJwt('verificacion', _resp().datos.jwtVerificacion);
        this._storageGlobal.setDatosCliente(_resp().datos.datosCliente);

        console.log('cliente registrado correctamente:', this._storageGlobal.getDatosCliente());
        console.log('cuenta:', this._storageGlobal.getDatosCliente()?.cuenta);

        this._router.navigateByUrl('/Cliente/Verificar/Registro');
      } else {
        // mostrar mensaje de error
      }
    }, { injector: this._injector });
  }

  // ---------- MOSTRAR / OCULTAR CONTRASEÑAS ----------
  SetRePassVisible() {
    this.repassVisible.set(!this.repassVisible());
  }

  SetPassVisible() {
    this.passVisible.set(!this.passVisible());
  }

}
