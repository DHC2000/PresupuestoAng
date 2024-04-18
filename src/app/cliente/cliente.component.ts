import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

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

  constructor(public servicio: ClientesService){
    this.servicio.obtenerListaClientes();
   }
 
   get listado(){
     return this.servicio.listaClientes;
   }

   guardarCliente(){

    const nombre = this.referenciaNombre.nativeElement.value;
    const apPaterno = this.referenciaApPaterno.nativeElement.value;
    const apMaterno = this.referenciaApMaterno.nativeElement.value;
    const telefono = this.referenciaTelefono.nativeElement.value;
    const correo = this.referenciaCorreo.nativeElement.value;
    
    this.servicio.guardarCliente(nombre,apPaterno,apMaterno,telefono,correo);
  }

  eliminar(id:number){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire("Saved!", "", "success");
        this.servicio.eliminarCliente(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
