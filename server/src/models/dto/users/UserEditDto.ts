export default interface UserEditDto {
    username: string,
    password: string,
    biography: string,
    emailAddress: string,
    isActivated?: boolean, 
    activationLink?: string | null
}