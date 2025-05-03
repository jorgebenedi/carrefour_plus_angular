// ========================== IMPORTACIONES NECESARIAS ==========================
import { Component, effect, inject, Injector, signal } from '@angular/core'; // Componentes y herramientas de inyección
import { ActivatedRoute, Router } from '@angular/router'; // Módulos de enrutamiento
import { RestClientService } from '../../../../servicios/rest-client.service'; // Servicio para peticiones HTTP
import { HTTP_INJECTIONTOKEN_STORAGE_SVCS } from '../../../../app.config'; // Servicio de almacenamiento global


// ========================== DECORADOR DEL COMPONENTE ==========================
@Component({
  selector: 'app-verif2-facode', // Selector del componente
  imports: [], // Importaciones adicionales si es necesario 
  templateUrl: './verif2-facode.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./verif2-facode.component.css'] // Ruta de los estilos CSS
})

// ========================== DEFINICIÓN DE LA CLASE ==========================
export class Verif2FACodeComponent {

  // --------------------- PROPIEDADES DEL COMPONENTE ---------------------
  operacion = signal<string>(''); // Señal que almacena el tipo de operación (e.g. "registro" o "login")
  codigoChars = signal<string[]>(Array.from({ length: 6 }, _ => '')); // Array para almacenar los caracteres introducidos en el código de verificación

  private _codigo: string = ''; // Código de verificación
  private _jwt: string = ''; // Token JWT de verificación

  // --------------------- INYECCIÓN DE SERVICIOS ---------------------
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute); // Inyección de ActivatedRoute para obtener parámetros de la URL
  private restClient: RestClientService = inject(RestClientService); // Servicio para hacer peticiones HTTP
  private _storageGlobal = inject(HTTP_INJECTIONTOKEN_STORAGE_SVCS); // Servicio de almacenamiento global
  private _injector = inject(Injector); // Inyección de dependencias
  private _router: Router = inject(Router); // Servicio de enrutamiento para navegar entre componentes

  // ========================== CONSTRUCTOR ==========================
  constructor() {
    // Obtener el parámetro de la URL y asignarlo a la señal "operacion"
    this.operacion.set(this.activatedRoute.snapshot.paramMap.get('operacion') || '');

    // Recuperar el código y JWT desde el almacenamiento global (comentado por ahora)
    // this._codigo = this._storageGlobal.getCodigoVerificacion();
    // this._jwt = this._storageGlobal.getJWT()!.verificacion;
    // console.log('código y JWT de verificación recuperados:', this._codigo, this._jwt);
  }

  // ========================== MÉTODOS ==========================

  // ---------- ALMACENAR EL CÓDIGO EN EL ARRAY DE SEÑAL ----------
  PushValue($event: Event, a: number) {
    // Actualizar el array de caracteres con el nuevo valor introducido en el campo de texto
    this.codigoChars.update(prev =>
      prev.map((el, pos) => pos === a - 1 ? ($event.target as any).value : el)
    );
    console.log('Array de caracteres hasta ahora:', this.codigoChars());
  }

  // ---------- VALIDAR EL CÓDIGO DE VERIFICACIÓN ----------
  async ValidarCodigo() {
    // Unir los caracteres del código en un string
    const _codigoIntroducido: string = this.codigoChars().join('');
    console.log('Datos del cliente:', this._storageGlobal.getDatosCliente());

    // Llamar al servicio para verificar el código introducido
    let _resp = await this.restClient.VerificarCodigo(
      this.operacion(), // Operación (registro o login)
      _codigoIntroducido, // Código introducido por el usuario
      this._jwt, // Token JWT de verificación
      this._storageGlobal.getDatosCliente()!.cuenta.email // Email del cliente
    );

    // Efecto para manejar la respuesta de la verificación
    effect(() => {
      if (_resp().codigo === 0) {
        // Si la verificación fue exitosa, redirigir al home de la tienda
        this._router.navigateByUrl('/Tienda/Home');
      } else {
        // Si hubo error en la verificación, mostrar mensaje de error en la vista
        // Mostrar el mensaje de error en el frontend (por implementar)
      }
    }, { injector: this._injector });
  }
}
