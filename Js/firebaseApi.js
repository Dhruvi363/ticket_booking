

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDoc, serverTimestamp, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDkKEMbWHdPPGw4vr14c5fMHG1qXz4b9UE",
    authDomain: "ticket-booking-c7f9c.firebaseapp.com",
    projectId: "ticket-booking-c7f9c",
    storageBucket: "ticket-booking-c7f9c.appspot.com",
    messagingSenderId: "577108386667",
    appId: "1:577108386667:web:eec5791c46ba060062e22e",
    measurementId: "G-MNVT1C69JS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION_CONTACTS = 'contacts';
const COLLECTION_PAYMENTS = 'payments';
const COLLECTION_COD = 'cod';

export async function saveContactDetails(name, passes, mobile) {
    if (!name || !passes || !mobile) {
        throw new Error("Please provide all required fields: name, passes, and mobile.");
    }
    const userData = {
        name: name,
        passes: passes,
        mobile: mobile,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_CONTACTS, mobile);

    try {
        await setDoc(userRef, userData);
        console.log("Document successfully written with phone number as ID!");
        return userRef.id;
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
}

export async function savePaymentDetails(name, amountPaid, dateOfPasses, contactNumber, upirefid) {
    if (!name || !amountPaid || !dateOfPasses || !contactNumber || !upirefid) {
        throw new Error("Please provide all required fields: name, amountPaid, dateOfPasses, and contactNumber.");
    }
    if (upirefid.length !== 12) {
        throw new Error("Please provide a valid UPI Ref ID.");
    }

    const userData = {
        name: name,
        amountPaid: parseFloat(amountPaid),
        dateOfPasses: dateOfPasses,
        contactNumber: contactNumber,
        upirefid: upirefid,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_PAYMENTS, upirefid);
    
    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            throw new Error("A response with this UPI Ref ID already exists.");
        } else {
            await setDoc(userRef, userData);
            return upirefid;
        }
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
}

export async function saveCODDetails(name, amountToPay, dateOfPasses, contactNumber) {
    if (!name || !amountToPay || !dateOfPasses || !contactNumber) {
        throw new Error("Please provide all required fields: name, amountToPay, dateOfPasses, and contactNumber.");
    }

    const userData = {
        name: name,
        amountToPay: parseFloat(amountToPay),
        dateOfPasses: dateOfPasses,
        contactNumber: contactNumber,
        timestamp: serverTimestamp()
    };

    const userRef = doc(db, COLLECTION_COD, contactNumber);
    
    try {
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) {
            throw new Error("A COD order with this contact number already exists.");
        } else {
            await setDoc(userRef, userData);
            return contactNumber;
        }
    } catch (error) {
        console.error("Error writing COD document: ", error);
        throw error;
    }
}