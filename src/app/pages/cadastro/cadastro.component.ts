import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NovoUsuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import toastr from 'toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });

  }

  cadastrar() {
    if (this.cadastroForm.valid && !this.cadastroForm.pending) {
      const novoUsuario = this.cadastroForm.getRawValue() as NovoUsuario;
      this.usuarioService
        .cadastrar(novoUsuario)
        .subscribe(
          (res) => {
            toastr.success(res.message);
          },
          err => console.log(err)
        );
    }

  }


}
