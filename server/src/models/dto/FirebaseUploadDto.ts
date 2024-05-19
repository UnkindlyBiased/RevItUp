import FirebaseRefEndponts from "../../../utils/enums/FirebaseRefEndpoints"

type FirebaseUploadDto = {
    image: Express.Multer.File,
    imageName?: string,
    endpoint: FirebaseRefEndponts
}

export default FirebaseUploadDto