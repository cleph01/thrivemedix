import firebase_app from "./config";
import {
    getFirestore,
    doc,
    collection,
    writeBatch,
    serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function sendSMS(
    business,
    patientNumber,
    practiceUser,
    chatMessage,
    deleteFormData
) {
    let result = null;
    let error = null;

    try {
        const batch = writeBatch(db);

        // Updates the lastSeen
        const usersRef = doc(db, `users/${practiceUser.id}`);

        batch.set(
            usersRef,
            {
                lastSeen: serverTimestamp(),
            },
            { merge: true }
        );

        // Adds Message to be OutGoing Text Collection for Twilio
        const outTextDocRef = doc(collection(db, "textMessages"));

        batch.set(outTextDocRef, {
            to: patientNumber,
            from: business.twilioNumber,
            body: chatMessage,
        });

        // Since we don't have a doc id to set, we have to generate
        // a new id; so we use the doc(collection()) vs. the doc(db, path)
        // format above

        // sends message
        const messagesRef = doc(collection(db, `chats`));

        batch.set(messagesRef, {
            businessId: business.id,
            businessTwilioNumber: business.twilioNumber,
            from: business.twilioNumber,
            to: patientNumber,
            patientNumber: patientNumber,
            message: chatMessage,
            direction: "out",
            businessUser: practiceUser.id,
            timestamp: serverTimestamp(),
        });

        result = await batch.commit();
        // Reset input field
    } catch (e) {
        console.log("error sending sms message: ", e);
        error = e;
    }

    return { result, error };
}
