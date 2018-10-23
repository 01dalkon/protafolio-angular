import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcionInterface } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcionInterface;
  id: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService ) { }

  ngOnInit() {
    this.route.params
    .subscribe( paramt => {
      // console.log(paramt['id']);
      this.productoService.getProducto(paramt['id'])
      .subscribe( (producto: ProductoDescripcionInterface) => {
        this.id = paramt['id'];
        this.producto = producto;
      // console.log(producto);
      });
    });
  }

}
