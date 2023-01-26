import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../model/user';
import { UserActions } from '../store/user/user.action';
import { getUser } from '../store/user/user.selector';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.store.select(getUser({ id: id })).subscribe(u =>
          this.user = u
        );
      }
    });
  }

  navigateBackToList() {
    this.router.navigate(['users']);
  }

  deleteUser() {
    this.store.dispatch(UserActions.removeUser(this.user!.id));
    this.navigateBackToList();
  }
}
