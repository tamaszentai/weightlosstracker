import {computed, ref} from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {getFirestore} from "firebase/firestore";
import {collection, doc, getDocs, setDoc} from '@firebase/firestore';
import {IWeek} from "../interfaces/IWeek";
import {week1, week2, week3, week4} from "@/assets/backup";
import {useAuthStore} from "@/stores/auth";

export const useWeightsStore = defineStore('weights', () => {
    const db = getFirestore();
    const allWeeks = ref<IWeek []>([]);
    const isFetched = ref(false);
    const authStore = useAuthStore();
    const {currentUser} = storeToRefs(authStore);
    const today = new Date();
    const todayIndex = new Date().getDay();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, 0, 1);
    const pastDays = (+today - +firstDay) / 86400000; // 86400000 ms = 1 day
    const currentWeekNumber = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);


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

    const addWeek = async (week: IWeek, userId: string) => {

        await setDoc(doc(db, `${userId}`, `${week.year}-${week.weekNumber}`), week);
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
