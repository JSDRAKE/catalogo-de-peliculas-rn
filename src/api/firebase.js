import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Asegúrate de importar Firestore

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN_KEY,
  FIREBASE_PROJECT_ID_KEY,
  FIREBASE_STORAGE_BUCKET_KEY,
  FIREBASE_MESSAGIN_SENDER_ID_KEY,
  FIREBASE_APP_ID_KEY,
} from "@env";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN_KEY,
  projectId: FIREBASE_PROJECT_ID_KEY,
  storageBucket: FIREBASE_STORAGE_BUCKET_KEY,
  messagingSenderId: FIREBASE_MESSAGIN_SENDER_ID_KEY,
  appId: FIREBASE_APP_ID_KEY,
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };

// Función para agregar una película a favoritos
export const addToFavorites = async (movieId, title, posterPath) => {
  try {
    const docRef = await addDoc(collection(db, "favorites"), {
      movieId,
      title,
      posterPath,
    });
    console.log("Película añadida a favoritos:", docRef.id);
  } catch (e) {
    console.error("Error añadiendo a favoritos: ", e);
  }
};

// Función para obtener todas las películas favoritas
export const getFavorites = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push(doc.data()); // Agrega cada película al arreglo
    });
    return favorites; // Retorna el arreglo de favoritos
  } catch (e) {
    console.error("Error obteniendo los favoritos: ", e);
    return []; // Retorna un arreglo vacío si ocurre un error
  }
};

// Función para eliminar una película de favoritos
export const removeFromFavorites = async (movieId) => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("movieId", "==", movieId)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "favorites", docSnapshot.id));
      console.log("Película eliminada de favoritos:", docSnapshot.id);
    });
  } catch (e) {
    console.error("Error eliminando de favoritos: ", e);
  }
};
