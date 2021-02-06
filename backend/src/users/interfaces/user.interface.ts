export interface EntireUser extends User {
    password: string;
}

export interface User extends LeastUser {
    token: string;
}

export interface LeastUser {
    id: string;
    username: string;
    email: string;
}