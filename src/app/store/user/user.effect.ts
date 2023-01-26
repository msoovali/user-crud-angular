import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { UserService } from "src/app/service/user.service";
import { UserActions } from "./user.action";


@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  loadAllBooks$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.fetchUsers),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => UserActions.fetchUsersSuccess(users)),
        catchError(() => EMPTY)
      ))
  ));
}
