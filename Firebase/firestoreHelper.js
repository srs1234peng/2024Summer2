import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { database, auth } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
    const updatedData = { ...data, owner: auth.currentUser.uid };
    try {
        await addDoc(collection(database, collectionName), updatedData);
    } catch (err) {
        console.error(err);
    }
}

export async function deleteFromDB(docId, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, docId));
    } catch (err) {
        console.error(err);
    }
}

export async function updateDetails(docId, collectionName, data) {
    try {
        await updateDoc(doc(database, collectionName, docId), data);
    } catch (err) {
        console.error(err);
    }
}

export async function readAllDocs(collectionName){
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        let newArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnapshot) => {
            newArray.push(docSnapshot.data());
          });
        }
        return newArray;
      } catch (err) {
        console.log(err);
      }
}
