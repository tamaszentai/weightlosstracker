import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from '@firebase/firestore';
import {IWeek} from "../interfaces/IWeek";

export const useWeightsStore = defineStore('weights', () => {
  const db = getFirestore();
  const currentWeek = ref(null);
  const allWeeks = ref<IWeek []>([]);
  const isFetched = ref(false);


  const fetchWeights = async (userId: string): Promise<void> => {
    if (isFetched.value) return
    const querySnapshot = await getDocs(collection(db, `${userId}`));
    querySnapshot.forEach((doc) => {
      allWeeks.value.push(doc.data() as IWeek);
      isFetched.value = true;
    });
  }

  const reset = () => {
    currentWeek.value = null;
    allWeeks.value = [];
    isFetched.value = false;
  }


  return {
    currentWeek,
    allWeeks,
    fetchWeights,
    reset,
  }
})
