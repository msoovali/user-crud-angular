import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.loadUsers();
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

  private loadUsers(): void {
    const s = this.userService.getUsers().subscribe(users => {
        console.log(users);
        this.users = users;
        this.filteredUsers = users;
      });
    this.subscriptions.push(s);
  }
}
