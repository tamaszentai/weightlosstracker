import {computed, ref} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {getFirestore} from "firebase/firestore";
import {collection, doc, getDocs, setDoc} from '@firebase/firestore';
import {IWeek} from "../interfaces/IWeek";
import {week1, week2, week3, week4} from "@/assets/backup";
import {useAuthStore} from "@/stores/auth";
import {DateTime} from "luxon";

export const useWeightsStore = defineStore('weights', () => {
    const db = getFirestore();
    const allWeeks = ref<IWeek []>([]);
    const isFetched = ref(false);
    const authStore = useAuthStore();
    const {currentUser} = storeToRefs(authStore);
    const today = DateTime.now();
    const weekStartDate = today.startOf('week').toJSDate();
    const weekEndDate = today.endOf('week').toJSDate();
    const currentWeekNumber = today.weekNumber
    const currentYear = today.year


    const fetchWeights = async (userId: string): Promise<void> => {
        if (isFetched.value) return
        const querySnapshot = await getDocs(collection(db, `${userId}`));
        querySnapshot.forEach((doc) => {
            allWeeks.value.push(doc.data() as IWeek);
            isFetched.value = true;
        });
    }

    const reset = () => {
        allWeeks.value = [];
        isFetched.value = false;
    }


    const previousWeek = computed(() => allWeeks.value.find((week) => {
        if (currentYear === week.year) {
            return currentWeekNumber - 1 === week.weekNumber;
        } else if (currentYear > week.year && currentWeekNumber === 1) {
            return week.weekNumber === 52;
        }
    }));

    const currentWeek = computed(() => allWeeks.value.find((week) => {
        if (currentYear === week.year) {
            return currentWeekNumber === week.weekNumber;
        }
    }));


    const calculateAverageWeight = (days: [{ weight: number | string }]) => {
        let numberValueCounter = 0
        let totalWeight = 0;
        for (const day of days) {
            if (typeof day.weight === "string") continue
            totalWeight += day.weight
            numberValueCounter++
        }
        return Number((totalWeight / numberValueCounter).toFixed(1));
    }


    const addWeek = async ({days}: any, userId: string) => {
        const week = {
            weekStartDate,
            weekEndDate,
            year: currentYear,
            weeklyAverage: calculateAverageWeight([...days] as [{ weight: number | string }]),
            weekNumber: currentWeekNumber,
            days: [...days]
        }

        await setDoc(doc(db, `${userId}`, `${currentYear}-${currentWeekNumber}`), week);
        reset();
    }

    // backup functionality
    const uploadBackup = async () => {
        const weeks = [week1, week2, week3, week4];
        for (const week of weeks) {
            await setDoc(doc(db, `${currentUser.value?.uid}`, `${week.year}-${week.weekNumber}`), week);
        }
    }


    return {
        allWeeks,
        fetchWeights,
        reset,
        previousWeek,
        currentWeek,
        addWeek,
        uploadBackup,
    }
})
