import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  passwordType: string = 'password';
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      showPassword: [false],
    });
  }

  onSubmit() {
    this.errorMessage = null;
    const formData = this.loginForm.value;

    const response = this.authService.login(formData.email, formData.password);
    if (!response) {
      this.errorMessage = 'Usuario o contraseña incorrecta.';
    }
    if (response) {
      this.router.navigate(['home']);
      this.loginForm.reset();
    }
  }

  showPasswordToogle() {
    const showPassword = this.loginForm.get('showPassword')?.value;
    this.passwordType = showPassword ? 'text' : 'password';
  }
}
