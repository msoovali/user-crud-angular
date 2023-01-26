import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

const userState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    userState,
    s => s.users
);

export const getUser = (props: { id: number }) => createSelector(
    userState,
    s => s.users.find(u => u.id == props.id)
);

export const areUsersLoaded = createSelector(
    userState,
    s => s.initialized
);