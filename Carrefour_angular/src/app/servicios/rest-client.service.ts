import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Injector, Signal } from '@angular/core';
import IRestMessage from '../modelos/interfaces_orm/IRestMessage';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestClientService {
    private _httpClient=inject(HttpClient);
    private _injector=inject(Injector);


  constructor() { }

  //#region ------------------ metodos pet.a servicio nodejs de zonaCliente ---------------
    public LoginRegistroCliente( datos:any, operacion:string ): Signal<IRestMessage>{
      return toSignal(
              this._httpClient
                  .post<IRestMessage>(
                          `http://localhost:3003/api/zonaCliente/${operacion}`,
                          datos,
                          { headers: new HttpHeaders( { 'Content-Type': 'application/json ' } ) }
                    )
                  .pipe(
                      startWith( { codigo:100, mensaje:'...esperando respuesta del server.... '} ), //<------ inicializo el observable a un valor hasta q el servicio nodejs me conteste
                    )
              ,{ injector: this._injector, requireSync: true}
                  );

    }
    public VerificarCodigo( operacion: string, codigo: string, jwt: string, email: string): Signal<IRestMessage>{
      return toSignal(
        this._httpClient
            .post<IRestMessage>(
                    'http://localhost:3003/api/zonaCliente/VerificarCodigo',
                    { operacion, codigo, jwt, email },
                    { headers: new HttpHeaders( { 'Content-Type': 'application/json ' } ) }
              )
            .pipe(
                startWith( { codigo:100, mensaje:'...esperando respuesta del server.... '} ), //<------ inicializo el observable a un valor hasta q el servicio nodejs me conteste
              )
        ,{ injector: this._injector, requireSync: true}
            );
    }

}
