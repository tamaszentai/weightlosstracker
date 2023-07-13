import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getAuth, User} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {collection, deleteDoc, doc, getDocs, getDoc, setDoc, updateDoc, Timestamp} from '@firebase/firestore';

export const useWeightsStore = defineStore('weights', () => {
  const db = getFirestore();
  const currentUser = ref<User | null>(null);
  const currentWeek = ref(null);
  const allWeeks = ref(null);
  const isFetched = ref(false);


  const fetchWeights = async (loggedUser: User): Promise<any> => {
    currentUser.value = loggedUser;
    if (isFetched.value) {
      return;
    }
    const querySnapshot = await getDoc(doc(db, "users", `${loggedUser.uid}`));
    const data = querySnapshot.data();
    console.log(data);
  }

  const deleteCurrentUser = () => {
    currentUser.value = null;
  }

  return {
    currentWeek,
    allWeeks,
    currentUser,
    fetchWeights,
    deleteCurrentUser,
  }
})
