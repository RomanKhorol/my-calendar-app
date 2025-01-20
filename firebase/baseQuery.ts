import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FirebaseError } from "firebase/app";
import {db} from "../firebase/firebase"
import {
  FirestoreBaseQueryArgs,
  FirestoreBaseQueryResult,
  ReturnDataType,
} from "../src/models/fireStoreDataTypes";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


 export const firestoreBaseQuery: BaseQueryFn<
   FirestoreBaseQueryArgs,
   FirestoreBaseQueryResult,
   { code: string; message: string }
 > = async ({ coll, method, data, id }) => {
   try {
     const collRef = collection(db, coll);

     switch (method) {
       case "get": {
         const querySnapshot = await getDocs(collRef);
         const results: ReturnDataType[] = querySnapshot.docs.map((doc) => {
           const docData = doc.data();
           return {
             id: doc.id,
             title: docData.title,
             start: docData.start.toDate().toString(),
             notes: docData.notes,
           };
         });
         
         return { data: results };
       }

       case "add": {
         if (data) {
           
           const docRef = await addDoc(collRef, data);
           return { data: { id: docRef.id, ...data } };
         }
         throw new Error("Данные для добавления отсутствуют");
       }

       case "update": {
         if (data && id) {
           const updateRef = doc(db, coll, id);
           await updateDoc(updateRef, data);
           return { data: { id: updateRef.id, ...data } };
         }
         throw new Error("Данные для обновления отсутствуют");
       }

       case "delete": {
         if (id) {
           const deleteRef = doc(db, coll, id!);
           await deleteDoc(deleteRef);
           return { data: id };
         }
         throw new Error("ID для удаления отсутствует");
       }

       default:
         throw new Error("Метод не поддерживается");
     }
   } catch (error) {
     if (error instanceof FirebaseError) {
       return {
         error: {
           code: error.code,
           message: error.message,
         },
       };
     }
     return {
       error: {
         code: "unknown",
         message: "Unknown error occurred",
       },
     };
   }
 };
