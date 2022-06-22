interface Iuser {
    id: string,
    fullname: string,
    email: string,
    password: string
}

declare namespace Express {
    interface Request {
        user?: Iuser;
    }
}
