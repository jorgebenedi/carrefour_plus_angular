import { Component, computed, ElementRef, inject, Injector, resource, ResourceLoaderParams, ResourceRef, signal, viewChild, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import IRestMessage from '../../../../modelos/IRestMessage';
import ICategoria from '../../../../modelos/interfaces_orm/ICategoria';
import { computeMsgId } from '@angular/compiler';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //------ inyeccion servicios -----------
  private _injector=inject(Injector);
  private _router=inject(Router);

  //#region ========================== propiedades componente =================================
  public breadCrumb=signal<ICategoria[]>( [ { nombreCategoria:'Carrefour.es', imagen:'', pathCategoria:'raices' } ] ); //<--- señal para barra navegacion cats
  public categoria=signal<ICategoria|null>(null); //<------------------------------------------------------------------------ señal para almacenar cat.seleccionada
  
  //@ViewChild('botonCerrar') botonCerrar!:ElementRef //<---- forma antigua de apuntar dentro del codigo del componente a variable en vista html (template-variables)
  public botonCerrar=viewChild<ElementRef>('botonCerrar'); 


  // ------------------- recuperamos categorias raices ------------------
  //lo hacemos usando funcion "resource" de angular 19
  //el objeto que le pasamos a la funcion es de tipo ResourceOptions con propiedad obligatoria
  //"loader" <------- funcion asincrona encargada de devolver el tipo de dato por la funcion "resource"
  public categoriasResource:ResourceRef<IRestMessage>=resource(
    {
      request: this.categoria, // cuando las dependencias para hacer una nueva pet.loader son de una sola señal, 
                              //  se puede acortar el codigo en vez de usar funcion: ()=> ({categoria: this.categoria }),
      loader: async ( { request, abortSignal, previous } )=>{
              console.log('valor de parametros ResourceLoaderParams de la funcion loader...', request, abortSignal, previous);
              let _pathCat=this.categoria()?.pathCategoria || 'raices';
              let _resp=await fetch(
                                    `http://localhost:3003/api/zonaTienda/Categorias?pathCat=${_pathCat}`,
                                     { method: 'GET', signal: abortSignal }
                                    );
              let _body=await _resp.json();
              return _body ?? { codigo:400, mensaje:'...recuperando categorias....'} 

      },
      injector: this._injector
    }
  )

  //para acceder a contenido del objeto ResourceRef de la funcion resource:
  public categorias=computed<ICategoria[]>( ()=> this.categoriasResource.value().codigo==0 ? this.categoriasResource.value().datos : [] )
  //------------------------------------------------------------------------------------------------
  //#endregion

  //#region ================================== metodos componente =============================
  public RecuperarSubcats(cat: ICategoria){
      //antes de recupoerar subcategorias de la categoria seleccionada comprobamos si es una categoria final, su pathCategoria acaba en "-$"
      //si es asi, YA NO RECUPERO SUBCATEGORIAS, sino que RECUPERO PRODUCTOS!!!! y redirigo a componente Productos
      
      if( /.*-\$$/.test(cat.pathCategoria)){
        this.InicializarCats();
        this.botonCerrar()?.nativeElement.click();
        this._router.navigate(['/Tienda/Productos', cat.pathCategoria]);
      }

      //establezco señal categoria a cat.seleccionada y muestro esa categoria en breadcrumb:
      
      this.categoria.set(cat);
      this.breadCrumb.update( (prev:ICategoria[])=>{
        //antes de añadir la categora al breadcrumb compruebo si no esta añadido ya, para evitar duplicar la misma en el arbol de navegacion
        let _pos=prev.findIndex( categ => categ.pathCategoria == cat.pathCategoria ); //<--- si es -1 no existe en el array la cat.seleccionada, lo tengo q añadir
         return _pos == -1 ? [ ...prev, cat ] : prev.slice(0, _pos+1);
      })
      

  }

  public InicializarCats(){
    // inicio la señal categoria a null (para q cargue de  nuevo categorias raices) y la de barra navegacion de categorias o breadcrumb
    this.categoria.set(null);
    this.breadCrumb.set([ { nombreCategoria:'Carrefour.es', imagen:'', pathCategoria:'raices' } ]);
  }
 //#endregion

}
