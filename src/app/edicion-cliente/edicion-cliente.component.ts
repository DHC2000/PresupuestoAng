import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicion-cliente',
  standalone: true,
  imports: [],
  templateUrl: './edicion-cliente.component.html',
  styleUrl: './edicion-cliente.component.css'
})
export class EdicionClienteComponent {

   //atributos
   @ViewChild("nombre")
   referenciaNombre!: ElementRef;
   
   @ViewChild("apPaterno")
   referenciaApPaterno!: ElementRef;
 
   @ViewChild("apMaterno")
   referenciaApMaterno!: ElementRef;
   
   @ViewChild("telefono")
   referenciaTelefono!: ElementRef;
   
   @ViewChild("correo")
   referenciaCorreo!: ElementRef;
 
   private params:any;
   private id:number = 0;
 
   constructor(private servicio: ClientesService, private router:Router
     ,private ruta: ActivatedRoute
 
   ){
     this.params = this.ruta.params.subscribe(parametros => {
       this.id = parametros["id"];
       console.log(this.id);
       this.servicio.obtenerCliente(this.id);
     })
   }
 
   get cliente(){
     return this.servicio.cliente;
   }
 
   guardarCliente(){
 
     const nombre = this.referenciaNombre.nativeElement.value;
     const apPaterno = this.referenciaApPaterno.nativeElement.value;
     const apMaterno = this.referenciaApMaterno.nativeElement.value;
     const telefono = this.referenciaTelefono.nativeElement.value;
     const correo = this.referenciaCorreo.nativeElement.value;     
     this.servicio.actualizarCliente(this.id,nombre,apPaterno,apMaterno,telefono,correo);
   }
 
}
