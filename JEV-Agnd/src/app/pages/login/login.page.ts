import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { 
    this.createForm()
  }
  version: any = '2023.9.24.dev';
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {

  }

  LoginForm!: FormGroup;
  createForm() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.LoginForm.get('email')!;
  }
  get password() {
    return this.LoginForm.get('password')!;
  }

  submit_login() {
    if (this.LoginForm.invalid) {
      console.log('Formulario De Adição Invalido')
      return;
    }
    console.log('Formulario De Adição Concluído')
  }
}
