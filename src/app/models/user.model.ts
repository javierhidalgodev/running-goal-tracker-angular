export interface NewUser {
    username: string,
    email: string,
    password: string,
    profileIMG?: string
}

export interface User extends NewUser {
    registrationDate: Date
}

export interface UserDBJSON extends User {
    id: string
}

export interface Login {
    email: string,
    password: string
}

export const DEFAULT_PROFILE_USER_IMG = 'profile-default.png'