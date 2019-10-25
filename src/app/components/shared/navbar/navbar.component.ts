import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { SecurityUtils } from './../../../utils/security-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = SecurityUtils.getUser();
  }

  logout() {
    SecurityUtils.clear();
    this.router.navigate(['/login']);
  }
}
