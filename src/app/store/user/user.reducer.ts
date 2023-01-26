import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { UserActions } from "./user.action";

export interface UserState {
    users: ReadonlyArray<User>
    initialized: boolean
}

export const initialState: UserState = {
    users: [],
    initialized: false
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.fetchUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        initialized: true
    })),
    on(UserActions.addUser, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),
    on(UserActions.removeUser, (state, { userId }) => ({
        ...state,
        users: state.users.filter(u => u.id !== userId)
    })),
)