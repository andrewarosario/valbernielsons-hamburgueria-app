import { Component, OnInit } from '@angular/core';
import toastr from 'toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });

  }

  login() {
    if (this.loginForm.valid && !this.loginForm.pending) {

      const usuario = this.loginForm.getRawValue() as LoginUsuario;

      this.authService
      .autenticar(usuario)
      .subscribe(
          (res) => {
              this.router.navigate(['/sacola']);
          },
          err => {
              console.log(err);
              toastr.error(err.error.message);
          }
      );
    }

  }

}
