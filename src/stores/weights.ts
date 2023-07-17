import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import {getFirestore} from "firebase/firestore";
import {collection, getDocs, setDoc, updateDoc, doc} from '@firebase/firestore';
import {IWeek} from "../interfaces/IWeek";
import {week1, week2, week3} from "@/assets/backup";

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

  const lastWeek = computed(() => {
    return allWeeks.value[allWeeks.value.length - 1];
  })

  // backup functionality
  // const uploadBackup = async () => {
  //   await setDoc(doc(db, 'userId', `${week3.year}-${week3.weekNumber}`), week3);
  // }






  return {
    currentWeek,
    allWeeks,
    fetchWeights,
    reset,
    lastWeek,
  }
})
