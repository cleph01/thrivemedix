import firebase_app from "./config";
import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function getLiveData(path, setter) {
    const q = query(
        collection(
            db,
            "businesses/X5xnQE4nqjRTmQDQzc3H/chats/19143125729/messages"
        )
    );

    onSnapshot(q, (querySnapchot) => {
        let ar = [];

        querySnapchot.docs.forEach((doc) => {
            ar.push({ id: doc.id, ...doc.data() });
        });

        setter(ar);
    });
}
