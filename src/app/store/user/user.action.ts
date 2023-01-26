import { createActionGroup, emptyProps } from "@ngrx/store";
import { User } from "src/app/model/user";

export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'Fetch Users': emptyProps(),
        'Fetch Users Success': (users: User[]) => ({ users }),
        'Add User': (user: User) => ({ user }),
        'Update User': (user: User) => ({ user }),
        'Remove User': (userId: number) => ({ userId }),
    }
})