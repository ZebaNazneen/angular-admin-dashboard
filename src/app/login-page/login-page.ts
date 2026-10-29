import { Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  loading = signal<boolean | null>(false);
  errorMessage = signal<string | null>('')

  loginForm= this.fb.nonNullable.group({
    email:['',[Validators.required, Validators.email]],
    password : ['',[Validators.required]]
  })
  get email() {return this.loginForm.controls.email;}
  get password(){return this.loginForm.controls.password;}

  async onSubmit()
  {
    if(this.loginForm.invalid)
    {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set('');
    try {
    const { email, password } = this.loginForm.getRawValue();
      await this.auth.signIn(email, password);
      alert("correct");
      //await this.router.navigate(['/dashboard']);
    } 
    catch {
      this.errorMessage.set('Invalid email or password.');
    } finally {
      this.loading.set(false);
    }
  }
}