import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models/user';
import { UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  loading: false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
  }
}
