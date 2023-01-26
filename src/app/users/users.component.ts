import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription, take } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UserActions } from '../store/user/user.action';
import { areUsersLoaded, getUsers } from '../store/user/user.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  areUsersLoaded$: Observable<boolean> = this.store.select(areUsersLoaded);
  users: User[] = [];
  filteredUsers: User[] = [];
  searchValue: string = '';
  subscriptions: Subscription[] = [];
  debounceTime = 300;

  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.listenUsers();
    this.listenSearch();
  }

  navigateTo(id: number) {
    this.router.navigate(['users', id]);
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  private listenSearch(): void {
    const s = this.trigger.subscribe(currentValue => {
      if (!currentValue || currentValue == '') {
        this.filteredUsers = this.users;
      } else {
        this.filteredUsers = this.users.filter(u => u.name.toLowerCase().includes(currentValue.toLowerCase()));
      }
    });
    this.subscriptions.push(s);
  }

  private listenUsers(): void {
    const s = this.store.select(getUsers).subscribe(users => {
        this.users = [];
        users.forEach(val => this.users.push(Object.assign({}, val)));
        this.filteredUsers = this.users;
      });
    this.subscriptions.push(s);
  }
}
