export interface NewUser {
    email: string,
    password: string,
    profileIMG?: string
}

export interface User extends NewUser {
    id?: string,
    registrationDate: Date,
}

export interface Login {
    email: string,
    password: string
}

export const DEFAULT_PROFILE_USER_IMG = 'profile-default.png'