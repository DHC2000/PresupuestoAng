import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  
  public listaClientes:any[];
  public urlServidor: string = "http://localhost:8084/";
  public cliente:any;

  constructor(private http:HttpClient,private router:Router){
    this.listaClientes = [];
  }

  obtenerListaClientes(): void{
    this.http.get(this.urlServidor+"proyecto4/cliente").subscribe((respuesta:any) =>{
      console.log(respuesta);
      this.listaClientes = respuesta;
    })
  }

  guardarCliente(nombre:string, apPaterno:string,apMaterno:string,telefono:string,correo:string){
    this.http.post(this.urlServidor+"proyecto4/cliente",{
      "nombre": nombre,
      "apPaterno":apPaterno,
      "apMaterno":apMaterno,
      "telefono":telefono,
      "correo":correo,
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

  
  obtenerCliente(id:number):void{
    this.http.get(this.urlServidor+"proyecto4/cliente/obtener/"+id).subscribe(
      (respuesta:any)=>{
        console.log(respuesta);
        this.cliente= respuesta;
      }
    )
  }

  eliminarCliente(id:number):void{
    const parametrosPeticion = new HttpParams().set("id",id)
    this.http.delete(this.urlServidor+"proyecto4/cliente/eliminar",{
      params:parametrosPeticion
    }).subscribe((respuesta:any)=>{
      console.log(respuesta);
      this.obtenerListaClientes();
      Swal.fire({
        title:"Eliminado !",
        text:"Cliente eliminado correctamente",
        icon:"success"
      });
    });
  }

  //Funcion que realiza peticion PUT ala API para actualizar cliente
  actualizarCliente(id:number,nombre:string, apPaterno:string,apMaterno:string,telefono:string,correo:string){
    this.http.put(this.urlServidor+"proyecto4/cliente/actualizar/"+id,{
      "id":id,
      "nombre": nombre,
      "apPaterno":apPaterno,
      "apMaterno":apMaterno,
      "telefono":telefono,
      "correo":correo
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
          this.router.navigate(["clientes"])
        } 
      });
    });
  }

}
