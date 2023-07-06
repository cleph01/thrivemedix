import firebase_app from "./config";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getDocumentFromField(
    collectionName,
    field,
    value
) {
    const q = query(collection(db, collectionName), where(field, "==", value));

    let result = null;
    let error = null;

    try {
        const querySnapshot = await getDocs(q);

        // console.log(
        //     "queryNappuy: ",
        //     collectionName,
        //     field,
        //     value,
        //     querySnapshot.docs
        // );
        if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                result = { id: doc.id, ...doc.data() };
            });
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}
