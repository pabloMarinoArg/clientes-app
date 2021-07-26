import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear cliente";

  public create(): void{
 
  }


  constructor(private clienteService:ClienteService,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente)=> this.cliente = cliente
        )
      }
    })
  }

  public crear():void{
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['clientes'])
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ${cliente.apellido} creado con exito`,'success')
      }
    );
    
  }

}
