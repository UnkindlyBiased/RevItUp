export default interface UserEditDto {
    username: string,
    password: string,
    biography: string,
    emailAddress: string,
    isVerified?: boolean, 
    activationLink?: string | null
}