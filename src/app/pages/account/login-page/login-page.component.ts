import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from './../../../services/data.service';
import { SecurityUtils } from './../../../utils/security-utils';
import { CustomValidator } from './../../../validators/custom-validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  busy: boolean = false;

  constructor(private dataService: DataService,
    private fb: FormBuilder,
    private router: Router) {

    this.form = fb.group({
      username: ['',
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()
        ])],
      password: ['',
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.required])
      ]
    });
  }

  ngOnInit() {
    if (SecurityUtils.hasToken()) {
      this.busy = true;
      this.dataService.refreshToken()
        .subscribe(
          (data: any) => {
            this.busy = false;
            this.setUser(data.customer, data.token);
          },
          (err) => {
            localStorage.clear();
            this.busy = false;
          });
    }
  }

  submit() {
    this.busy = true;
    this.dataService.authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        });
  }

  setUser(user, token) {
    SecurityUtils.set(user, token);
    this.router.navigate(['/']);
  }
}
