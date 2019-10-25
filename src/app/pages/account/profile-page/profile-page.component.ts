import { User } from './../../../models/user.model';
import { CustomValidator } from './../../../validators/custom-validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { DataService } from './../../../services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  user: User;
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
          Validators.maxLength(60),
          Validators.required
        ])],
      document: [{ value: '', disabled: true }],
      email: ['',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator])]
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.dataService.getProfile()
      .subscribe(
        (data) => {
          this.busy = false;
          this.user = data;

          this.form.controls['name'].setValue(this.user.name);
          this.form.controls['document'].setValue(this.user.document);
          this.form.controls['email'].setValue(this.user.email);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      )
  }

  submit() {
    this.busy = true;

    this.dataService.updateProfile(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message, "Atualização completa");
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

}
