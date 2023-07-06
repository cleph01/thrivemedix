import React from "react";

import firebase_app from "./config";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function useGetDocumentWhere(collectionName, field, value) {
    const [doc, setDoc] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Define Function
        const getData = async (
            collectionName,
            field,
            value,
            setDoc,
            setLoading
        ) => {
            const q = query(
                collection(db, collectionName),
                where(field, "==", value)
            );

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
                        setDoc({ id: doc.id, ...doc.data() });
                    });
                }

                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        // Call function

        getData(collectionName, field, value, setDoc, setLoading);
    }, [collectionName, field, value]);

    return { doc, error, loading };
}
