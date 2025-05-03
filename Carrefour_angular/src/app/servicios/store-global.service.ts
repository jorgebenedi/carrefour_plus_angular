import { Injectable, signal } from '@angular/core';

// importa las interafaces para asegurarte de que los datos que se guardan en el localStorage son los correctos
import IStorageService from '../modelos/IStorageServices';
import ICliente from '../modelos/interfaces_orm/ICliente';
import IJwtFormat from '../modelos/IJwtFormat';

// se inyecta en toda la app a nivel global
@Injectable({
  providedIn: 'root'
})

// Crear la clase del servicio y obligas que cumpla la interfaz ItorageService ,
//  debe tener los métodos y propiedades que se definen en la interfaz
//  y que se implementan en el servicio
export class StorageGlobalService implements IStorageService {

  // valores reacctivos signals para almacenar los datos en el localStorage
  private _jwt=signal<IJwtFormat | undefined>( undefined )

  // guarda el codigo de verificación que se envía al correo del cliente
  private _codigo=signal<string>('');

  // guarda los datos del cliente
  private _datosCliente=signal<ICliente | undefined>( undefined )

  constructor() { }

  // getters para acceder a los valores de los signals
  // ------------------------------------------------------------------

  // devuelve el valor del JWT
  getJWT():IJwtFormat | undefined{
    return this._jwt() // los signals se leeen como funciones
  }

  // devuelve el valor del código de verificación
  getCodigoVerificacion(): string{
    return this._codigo(); // los signals se leeen como funciones
  }

  getDatosCliente(): ICliente | undefined{
    return this._datosCliente(); // deuvelve los datos del cliente, del signal datosCliente
  }



  // setters para guardar los valores en el localStorage
  // ------------------------------------------------------------------
  setJwt(tipo: string, value: string){
    //meto en objeto de señal en propiedad "tipo" (sesion, verificacion, refresh) el valor: "value"
    // { refresh: ...., sesion: ..., verificacion: .... }
    this._jwt
        .update(
                  valorprev => {
                                if (!! valorprev ) {
                                  return {  ...valorprev, [tipo]: value };
                                } else {
                                  return undefined;
                                }
                            }
        )
  }

  setCodigoVerificacion(codigo: string){
      this._codigo.set(codigo);
  }

  setDatosCliente(datosCliente: ICliente){
    // Actualiza el valor del signal _datosCliente
    this._datosCliente.update(

      // valorprev representa el valor anterior almacenado en el signal
      valorprev => {
        // Si ya existe un valor previo (por ejemplo, tras login o navegación previa)
        if (!!valorprev) {
          // Combina el valor anterior con los nuevos datos, sobrescribiendo campos
          return { ...valorprev, ...datosCliente };
        } else {
          // ⚠️ Si no había valor anterior (como justo después del registro),
          // antes devolvía undefined → lo que hacía que no se guardara nada.
          // ✅ Corregido: ahora devolvemos directamente los nuevos datos del cliente
          return datosCliente;
        }
      }

    )
  }


}
// jik3jihj3ruohiJH"U
// jar@gmail.com
