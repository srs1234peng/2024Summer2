import { addDoc, collection } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
    console.log(database);
    try {
        await addDoc(collection(database, collectionName), data);
    } catch (err) {   
        console.error(err);
    }
}
