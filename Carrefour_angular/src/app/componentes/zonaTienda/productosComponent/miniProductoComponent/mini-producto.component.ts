import { Component, input, Input } from '@angular/core';
import IProducto from '../../../../modelos/interfaces_orm/IProducto';

@Component({
  selector: 'app-mini-producto',
  imports: [],
  templateUrl: './mini-producto.component.html',
  styleUrl: './mini-producto.component.css'
})
export class MiniProductoComponent {
  //@Input() producto!:IProducto;
  producto=input<IProducto>();
  
}
