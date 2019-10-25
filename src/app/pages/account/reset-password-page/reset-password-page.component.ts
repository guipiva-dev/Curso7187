import { CustomValidator } from './../../../validators/custom-validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { DataService } from './../../../services/data.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {

  form: FormGroup;
  busy: boolean = false;

  constructor(private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {

    this.form = fb.group({
      document: ['',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.busy = true;

    this.dataService.resetPassword(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message, 'Senha Restaurada');
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }
}