import { CustomValidator } from './../../../validators/custom-validator';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html'
})
export class SignUpPageComponent implements OnInit {

  form: FormGroup;
  busy: boolean = false;

  constructor(private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {

    this.form = fb.group({
      name: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required])],
      document: ['',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()])],
      email: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator])],
      password: ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.busy = true;

    this.dataService.create(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message, 'Bem-Vindo');
          this.router.navigate(['/login']);
          console.log(this.form.value);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      )
  }
}