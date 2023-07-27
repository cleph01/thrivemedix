import firebase_app from "./config";
import {
    getFirestore,
    doc,
    collection,
    writeBatch,
    serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function sendEmail({
    businessId,
    senderId,
    to,
    subject,
    html,
    text,
    permission,
    firstName,
    lastName,
}) {
    let result = null;
    let error = null;

    try {
        const batch = writeBatch(db);

        // Updates the lastSeen
        // const usersRef = doc(db, `users/${senderId}`);

        // batch.set(
        //     usersRef,
        //     {
        //         lastSeen: serverTimestamp(),
        //     },
        //     { merge: true }
        // );

        // Adds entry to business's Invited User Collection
        const invitedUserRef = doc(
            collection(db, `businesses/${businessId}/invitedUsers`)
        );

        batch.set(invitedUserRef, {
            sender: senderId,
            to: to,
            subject: subject,
            text: text,
            timestamp: serverTimestamp(),
            firstName: firstName,
            lastName: lastName,
            permission: permission,
        });

        // Adds Message to be OutGoing Text Collection for Twilio

        // Since we don't have a doc id to set, we have to generate
        // a new id; so we use the doc(collection()) vs. doc(db, path)
        const inviteEmailDocRef = doc(collection(db, "email"));

        batch.set(inviteEmailDocRef, {
            to: to,
            message: {
                subject: subject,
                text: text,
                html: html,
            },
            firstName: firstName,
            lastName: lastName,
            businessId: businessId,
            sender: senderId,
        });

        result = await batch.commit();
        // Reset input field
    } catch (e) {
        console.log("error sending sms message: ", e);
        error = e;
    }

    return { result, error };
}
