import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectosService } from '../proyectos.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { ClientesService } from '../clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [CommonModule ,RouterModule,NavBarComponent ,FooterComponent],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent {

  //Ats
  @ViewChild("descripcion")
  referenciaDescripcion!: ElementRef;
  
  @ViewChild("cliente")
  referenciaCliente!: ElementRef;

  constructor(public servicio: ProyectosService,public clientes:ClientesService){
    this.servicio.obtenerListaProyectos();
    this.clientes.obtenerListaClientes();
   }
 
   get listaProyectos(){
     return this.servicio.listaProyectos;
   }

   get listaClientes(){
    return this.clientes.listaClientes;
   }

   guardarProyecto(){
    const descripcion = this.referenciaDescripcion.nativeElement.value;
    const cliente = this.referenciaCliente.nativeElement.value;
    this.servicio.guardarProyecto(descripcion,cliente);
  }

  eliminarPry(id:number){
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
        this.servicio.eliminarProyecto(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
