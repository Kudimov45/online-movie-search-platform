import {z} from 'zod'
import { validateResponse } from './validateResponse'

const URL = "https://cinemaguide.skillbox.cc/"

export const UserSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
    surname: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const UserProfileSchema = z.object({
    email: z.string(),
    favorites: z.array(z.string().nullable()),
    name: z.string().nullable(),
    surname: z.string().nullable()
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export function login(email: string, password: string): Promise<void> {
    return fetch(`${URL}auth/login`, {
         method: "POST",
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(validateResponse).then(()=> undefined)
}

export function registerUser(name: string, surname: string, email: string, password: string): Promise<void> {
    return fetch(`${URL}user`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            name,
            surname,
            
        })
    }).then(validateResponse).then(()=> undefined)
}

export function profileUser(): Promise<UserProfile> {
    return fetch(`${URL}profile`, {credentials: 'include'}).then(validateResponse).then((response) => response.json()).then((data) => UserProfileSchema.parse(data))
}

export function logout(): Promise<void> {
    return fetch(`${URL}auth/logout`, {credentials: 'include'}).then(validateResponse).then(()=> undefined)
}