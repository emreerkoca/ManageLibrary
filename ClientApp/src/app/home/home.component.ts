import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models/user';
import { UserService } from '@app/_services/user.service';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  loading = false;
  //users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
  }
}
