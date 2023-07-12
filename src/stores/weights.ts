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

  currentUser.value = getAuth().currentUser;

  const fetchWeights = async (): Promise<any> => {
    if (isFetched.value) {
      return;
    }
    const querySnapshot = await getDoc(doc(db, "users", `${currentUser.value?.uid}`));
    const data = querySnapshot.data();
    console.log(data);
  }

  return {
    currentWeek,
    allWeeks,
    fetchWeights
  }
})
