import { storage } from "@/config/firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


export const uploadIFile = async (file: File, type: string, onProgressChange?: (progress: number) => void, onError?: (error: string) => void,): Promise<string> => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `Resources::${type}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                onProgressChange && onProgressChange((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                onError && onError(error.message);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((fileUrl) => {
                    resolve(fileUrl);
                });
            },
        );
    });
};