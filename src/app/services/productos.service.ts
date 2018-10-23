import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { ConsoleReporter } from 'jasmine';
import { promise } from 'protractor';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: ProductoInterface[] = [];
  productoFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();
  }


  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
      .subscribe( (resp: ProductoInterface[])  => {
        // console.log(resp);
        this.producto = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-25cf9.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {

    if ( this.producto.length === 0 ) {
      // Esperar que carguen los productos
      this.cargarProductos().then( () => {
        // ejecutar despúes de tener los producos
        // Aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string) {
    // this.productoFiltrado = this.producto.filter( producto => {
    //   return true;
    // });
    // console.log(this.producto);
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.producto.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productoFiltrado.push( prod);
      }
    });
  }
}
