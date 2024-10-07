import { Observable } from "rxjs";
import bcrypt from 'bcryptjs'

export const hashPassword = (password: string): Observable<string> => {
    return new Observable<string>(observer =>{
        bcrypt.hash(password, 12, (err, hash) => {
            if(err) observer.error(err)

            observer.next(hash)
            observer.complete()
        })
    })
}