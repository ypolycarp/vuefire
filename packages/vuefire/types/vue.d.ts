/**
 * Augment the typings of Vue.js
 */

import Vue from 'vue'
import { firestore, database } from 'firebase'

declare module 'vue/types/vue' {
  // TODO: export types to allow custom function names
  interface Vue {
    $bind(
      name: string,
      reference: firestore.Query
    ): Promise<firestore.DocumentData[]>
    $bind(
      name: string,
      reference: firestore.DocumentReference
    ): Promise<firestore.DocumentData>
    $unbind: (name: string) => void
    $firestoreRefs: Readonly<
      Record<
        string,
        firestore.DocumentReference | firestore.CollectionReference
      >
    >

    $rtdbBind(
      name: string,
      reference: database.Reference | database.Query
    ): Promise<database.DataSnapshot>
    $rtdbUnbind: (name: string) => void
    $firebaseRefs: Readonly<Record<string, database.Reference>>
  }
}

type VueFirestoreObject = Record<
  string,
  firestore.DocumentReference | firestore.Query
>

type VueFirebaseObject = Record<string, database.Query | database.Reference>

type FirestoreOption<V> = VueFirestoreObject | ((this: V) => VueFirestoreObject)
type FirebaseOption<V> = VueFirebaseObject | ((this: V) => VueFirebaseObject)

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    firestore?: FirestoreOption<V>
    firebase?: FirebaseOption<V>
  }
}
