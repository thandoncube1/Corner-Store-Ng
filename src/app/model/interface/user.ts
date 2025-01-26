export interface IUser {
    message: string,
    result: boolean,
    data: {
        custId: number,
        name: string,
        mobileNo: string,
        password: string
    }
}

export interface IUsers {
    message: string,
    result: boolean,
    data: {
        custId: number,
        name: string,
        mobileNo: string,
        password: string
    }[]
}