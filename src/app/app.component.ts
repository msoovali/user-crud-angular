import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UserActions } from './store/user/user.action';
import { areUsersLoaded } from './store/user/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-crud-angular';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(areUsersLoaded).pipe(take(1)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(UserActions.fetchUsers());
      }
    });
  }
}
