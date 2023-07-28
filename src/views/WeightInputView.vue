<script setup>
import {onMounted, ref} from 'vue';
import {useWeightsStore} from "@/stores/weights";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {DateTime} from "luxon";


const weightsStore = useWeightsStore();
const authStore = useAuthStore();
const {currentUser} = storeToRefs(authStore);
const weekdaysData = ref(['', '', '', '', '', '', '']);
const weekdayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const today = DateTime.now();
const weekStartDate = today.startOf('week').toISODate();
const weekEndDate = today.endOf('week').toISODate();
const currentWeekNumber = today.weekNumber
const currentYear = today.year


onMounted(async () => {
  await weightsStore.fetchWeights(currentUser.value?.uid);
  if (!weightsStore.previousWeek) return;
  if (currentYear >= weightsStore.previousWeek.year) {
    if (currentWeekNumber > weightsStore.previousWeek.weekNumber || currentYear > weightsStore.previousWeek.year) {
      weekdaysData.value = weightsStore.currentWeek.days.map((day) => day.weight);
    }
  }
})


const createWeek = () => {
  return weekdaysData.value.map((weight, index) => {
    const iteratorDate = today.startOf('week').plus({days: index})
    return {
      date: iteratorDate.toJSDate(), weight
    }
  });
}


const submitData = () => {
  const payload = {
    days: [...createWeek()]
  }
  weightsStore.addWeek(payload, currentUser.value?.uid)
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Weekly weight input</h2>
            <h4 class="text-center text-l font-bold leading-9 tracking-tight text-gray-900">Week {{
                currentWeekNumber
                }},
                {{ currentYear }}</h4>
        </div>

        <div class="mt-10 sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="submitData">
                <div v-for="(day, index) in weekdaysData" :key="index" class="flex items-center justify-between">
                    <label for="day" class="block text-sm font-medium leading-6 text-gray-900">{{
                        weekdayLabels[index]
                        }}</label>
                    <div class="mt-2">
                        <input type="number" v-model="weekdaysData[index]" id="day" name="day"
                               :placeholder="weekdaysData[index] === '-' ? 'not available' : ''"
                               step=".1"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:text-gray-500"/>
                    </div>
                </div>


                <div>
                    <button type="submit"
                            class="flex w-full mb-6 justify-center rounded-md bg-green-500 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">
                        Submit
                    </button>
                </div>
            </form>
            <!--      <button @click="weightsStore.uploadBackup">Backup</button>-->
        </div>
    </div>
</template>