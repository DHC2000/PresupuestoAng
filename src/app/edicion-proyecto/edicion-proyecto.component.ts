import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProyectosService } from '../proyectos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edicion-proyecto',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './edicion-proyecto.component.html',
  styleUrl: './edicion-proyecto.component.css'
})
export class EdicionProyectoComponent {
    //Ats
    @ViewChild("descripcion")
    referenciaDescripcion!: ElementRef;
    
    @ViewChild("cliente")
    referenciaCliente!: ElementRef;

    private params:any;
    private id:number = 0;

    constructor(private servicio: ProyectosService, private router:Router
      ,private ruta: ActivatedRoute,public clientes:ClientesService
  
    ){
      this.params = this.ruta.params.subscribe(parametros => {
        this.id = parametros["id"];
        console.log(this.id);
        this.servicio.obtenerProyecto(this.id);
        this.clientes.obtenerListaClientes();
      })
    }

    get listaClientes(){
      return this.clientes.listaClientes;
    }

    get proyecto(){
      return this.servicio.proyecto;
    }

    get clienteS(){
      return this.clientes.cliente;
    }

     guardarProyecto(){
 
      const descripcion = this.referenciaDescripcion.nativeElement.value;
      const cliente = this.referenciaCliente.nativeElement.value;    
      this.servicio.actualizarProyecto(this.id,descripcion,cliente);
    }
}
