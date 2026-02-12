import { db } from "./firebase";
import {
    doc,
    setDoc,
    getDoc,
    onSnapshot
} from "firebase/firestore";

/* Save day */
export async function saveDayToCloud(key, data) {
    try {
        await setDoc(doc(db, "days", key), data, { merge: true });
    } catch (e) {
        console.error("Cloud save error:", e);
    }
}

/* Load single day */
export async function loadDayFromCloud(key) {
    try {
        const snap = await getDoc(doc(db, "days", key));
        return snap.exists() ? snap.data() : null;
    } catch {
        return null;
    }
}

/* REALTIME LISTENER (new) */
export function listenDayRealtime(key, callback) {
    return onSnapshot(doc(db, "days", key), (snap) => {
        if (snap.exists()) {
            callback(snap.data());
        }
    });
}
