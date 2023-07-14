import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {User} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {doc, getDoc} from '@firebase/firestore';

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
    allWeeks.value = Object.keys(data).map(key => data[key]);
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
