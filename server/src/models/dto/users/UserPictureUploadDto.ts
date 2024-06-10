type UserPictureUploadDto = {
    id: number
    image: Express.Multer.File
    imageName: string
}

export default UserPictureUploadDto