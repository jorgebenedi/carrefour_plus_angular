// ========================== IMPORTACIONES NECESARIAS ==========================
import { JsonPipe, NgClass } from '@angular/common'; // Pipes y clases necesarios
import { Component, effect, inject, Injector, Signal, signal } from '@angular/core'; // Componentes y herramientas de inyección
import { Router, RouterModule } from '@angular/router'; // Navegación de rutas
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Formularios reactivos y validadores
import { RestClientService } from '../../../../servicios/rest-client.service'; // Servicio para realizar solicitudes HTTP
import * as Validadores from '../../../../validators/validatorPatterns'; // Validadores personalizados
import { HTTP_INJECTIONTOKEN_STORAGE_SVCS } from '../../../../app.config'; // Configuración global de almacenamiento


// ========================== DECORADOR DEL COMPONENTE ==========================
@Component({
  selector: 'app-login', // Selector del componente
  imports: [ReactiveFormsModule, RouterModule, JsonPipe, NgClass], // Módulos necesarios para el componente
  templateUrl: './login.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./login.component.css'] // Ruta de los estilos CSS
})

// ========================== DEFINICIÓN DE LA CLASE ==========================
export class LoginComponent {

  // --------------------- PROPIEDADES DEL COMPONENTE ---------------------
  public loginForm: FormGroup; // Formulario reactivo para el login
  public mensajesError = signal<string>(''); // Señal para mostrar los errores de login

  // --------------------- INYECCIÓN DE SERVICIOS ---------------------
  private _router: Router = inject(Router); // Servicio de navegación
  private _restClient: RestClientService = inject(RestClientService); // Servicio para manejar peticiones HTTP
  private _injector = inject(Injector); // Inyección de dependencias
  private _storageGlobal = inject(HTTP_INJECTIONTOKEN_STORAGE_SVCS); // Servicio de almacenamiento global

  // ========================== CONSTRUCTOR ==========================
  constructor() {
    // Inicialización del formulario reactivo con controles de email y contraseña
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, // El email es obligatorio
        Validadores.emailValidator, // Validación personalizada para email
      ]),
      password: new FormControl('', [
        Validators.required // La contraseña es obligatoria
      ])
    });
  }

  // ========================== MÉTODOS ==========================

  // ---------- CONTINUAR CON EL LOGIN ----------
  ContinuarLogin() {
    console.log('Datos del formulario de login:', this.loginForm.value); // Mostrar los datos del formulario en consola

    // Realizar la solicitud de login al backend
    const _resp = this._restClient.LoginRegistroCliente(this.loginForm.value, 'Login');

    // Efecto para manejar la respuesta de la petición de manera reactiva
    effect(() => {
      console.log('Respuesta del servidor:', _resp()); // Mostrar la respuesta del servidor

      // Verificar si la respuesta es exitosa (código 0)
      if (_resp().codigo === 0) {

        // Almacenar los datos recibidos en el servicio global
        console.log('Datos recibidos de la respuesta:', _resp());  // Imprime toda la respuesta
        console.log('Código de verificación 2FA:', _resp().datos.codigo);  // Imprime el código de verificación
        console.log('JWT de verificación:', _resp().datos.jwtVerificacion);  // Imprime el JWT de verificación
        console.log('Datos del cliente:', _resp().datos.datosCliente);  // Imprime los datos del cliente

        // Almacenar los datos recibidos en el servicio global
        this._storageGlobal.setCodigoVerificacion(_resp().datos.codigo); // Código de verificación 2FA
        this._storageGlobal.setJwt('verificacion', _resp().datos.jwtVerificacion); // JWT para la verificación
        this._storageGlobal.setDatosCliente(_resp().datos.datosCliente); // Datos del cliente

        // Redirigir al componente de verificación de 2FA
        this._router.navigateByUrl('/Cliente/Verificar/Login');
      } else {
        // Si la respuesta es un error, mostrar el mensaje de error en la vista
        this.mensajesError.set(_resp().mensaje);
      }
    }, { injector: this._injector });
  }

  // ---------- COMPROBAR SI EL FORMULARIO ES VÁLIDO ----------
  get isFormValid() {
    return this.loginForm.valid; // Retorna true si el formulario es válido
  }

}
