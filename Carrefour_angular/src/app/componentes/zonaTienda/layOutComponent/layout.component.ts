import { Component } from '@angular/core';
import { HeaderComponent } from './headerComponent/header.component';
import { FooterComponent } from './footerComponent/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ RouterOutlet, HeaderComponent, FooterComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
