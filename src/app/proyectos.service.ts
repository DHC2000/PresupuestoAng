import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  public listaProyectos:any[];
  public urlServidor: string = "http://localhost:8084/";
  public proyecto:any;

  constructor(private http:HttpClient,private router:Router){
    this.listaProyectos = [];
  }

  obtenerListaProyectos(): void{
    this.http.get(this.urlServidor+"proyecto4/proyecto").subscribe((respuesta:any) =>{
      console.log(respuesta);
      this.listaProyectos = respuesta;
    })
  }

  guardarProyecto(descripcion:string, cliente:number){
    this.http.post(this.urlServidor+"proyecto4/proyecto",{
      "descripcion": descripcion,
      "cliente":cliente,
    },).subscribe((respuesta:any) => {
      console.log(respuesta.msg);
      Swal.fire({
        title: respuesta.msg,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
        //denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.reload();
            //this.router.navigate(["clientes"])
        } 
      });
    });
  }

  obtenerProyecto(id:number):void{
    this.http.get(this.urlServidor+"proyecto4/proyecto/obtener/"+id).subscribe(
      (respuesta:any)=>{
        console.log(respuesta);
        this.proyecto= respuesta;
      }
    )
  }

    //Funcion que realiza peticion PUT ala API para actualizar cliente
    actualizarProyecto(id:number,descripcion:string,cliente:number){
      this.http.put(this.urlServidor+"proyecto4/proyecto/actualizar/"+id,{
        "id":id,
        "descripcion": descripcion,
        "cliente":cliente,
      },).subscribe((respuesta:any) => {
        console.log(respuesta.msg);
        Swal.fire({
          title: respuesta.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
          //denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigate(["proyectos"])
          } 
        });
      });
    }

    eliminarProyecto(id:number):void{
      const parametrosPeticion = new HttpParams().set("id",id)
      this.http.delete(this.urlServidor+"proyecto4/proyecto/eliminar",{
        params:parametrosPeticion
      }).subscribe((respuesta:any)=>{
        console.log(respuesta);
        this.obtenerListaProyectos();
        Swal.fire({
          title:"Eliminado !",
          text:"Proyecto eliminado correctamente",
          icon:"success"
        });
      });
    }
}
