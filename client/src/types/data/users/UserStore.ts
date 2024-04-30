type UserStore = {
    id: number
    username: string
    emailAddress: string,
    isActivated: boolean,
    role: "banned" | "default" | "writer" | "admin"
}

export default UserStore