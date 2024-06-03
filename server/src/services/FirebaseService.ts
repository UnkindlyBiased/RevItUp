import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from "firebase/storage";

import { storage } from "../../utils/data/FirebaseClient";
import FirebaseUploadDto from "../models/dto/FirebaseUploadDto";

class FirebaseService {
    async uploadImage(uploadData: FirebaseUploadDto): Promise<StorageReference> {
        const metadata = {
            contentType: uploadData.image.mimetype
        }

        const uploadRef = ref(storage, `${uploadData.endpoint}/${uploadData.imageName}`)
        const snapshot = await uploadBytesResumable(uploadRef, uploadData.image.buffer, metadata)

        return snapshot.ref
    }
    async getDownloadUrl(ref: StorageReference): Promise<string> {
        return getDownloadURL(ref)
    }
    async deleteImage(imageUrl: string): Promise<void> {
        // TODO: implement deleting of image by ref -> storing refs somewhere in the DB
    }
}

export default FirebaseService