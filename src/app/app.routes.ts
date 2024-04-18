import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { EdicionClienteComponent } from './edicion-cliente/edicion-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { EdicionProyectoComponent } from './edicion-proyecto/edicion-proyecto.component';

export const routes: Routes = [
    {path:"clientes", component: ClienteComponent},
    {path:"clientes/detalle/:id", component: DetalleClienteComponent},
    {path:"", redirectTo:"clientes", pathMatch:"full"},
    {path:"clientes/editar/:id", component: EdicionClienteComponent},
    {path:"proyecto/editar/:id", component: EdicionProyectoComponent},
    {path:"proyectos", component: ProyectoComponent},
];
