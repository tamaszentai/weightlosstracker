import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getFirestore} from "firebase/firestore";
import {doc, getDoc} from '@firebase/firestore';

export const useWeightsStore = defineStore('weights', () => {
  const db = getFirestore();
  const currentWeek = ref(null);
  const allWeeks = ref([]);
  const isFetched = ref(false);


  const fetchWeights = async (userId: string): Promise<void> => {
    if (isFetched.value) {
      return;
    }
    const querySnapshot = await getDoc(doc(db, "users", `${userId}`));
    const data = await querySnapshot.data();
    allWeeks.value = Object.keys(data).map(key => data[key]);
  }


  return {
    currentWeek,
    allWeeks,
    fetchWeights,
  }
})
