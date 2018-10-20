import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: ProductoInterface[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }


  private cargarProductos() {
    this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
    .subscribe( (resp: ProductoInterface[])  => {
      console.log(resp);
      this.producto = resp;
      this.cargando = false;
    });
  }
}
