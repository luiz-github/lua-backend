import * as jwt from "jsonwebtoken"

interface PayloadJWT {
    id: number,
    name: string
}

export default class AuthService {
    private privateKey: string

    constructor() {
        this.privateKey = "private"
    }

    authenticate(id: number, name: string) {
        const payloadJWT: PayloadJWT = {
            id: id,
            name: name
        }
        const token = jwt.sign(payloadJWT, this.privateKey)
        return token
    }

    isAuthenticated(token: string) {
        try {
            jwt.verify(token, this.privateKey)
            return true
        } catch (error) {
            return false
        }
    }
}