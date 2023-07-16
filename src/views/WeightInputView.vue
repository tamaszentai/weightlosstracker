<script setup>
import {computed, ref} from 'vue';

const weekdaysData = ref([0, 0, 0, 0, 0, 0, 0]);
const weekdayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekdaysInJavaScriptOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();
const todayName = new Date().getDay();
const year = today.getFullYear();
const firstDay = new Date(year, 0, 1);
const pastDays = (today - firstDay) / 86400000; // 86400000 ms = 1 nap
const weekNumber = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);


const calcWeeklyAverage = computed(() => {
  let average = 0;
  if (weekdaysData.value.every((day) => day > 0)) {
    const sum = weekdaysData.value.reduce((a, b) => a + b, 0);
    average = (sum / weekdaysData.value.length).toFixed(1);
  }
  return average
})

const dayName = computed(() => {
  return weekdaysInJavaScriptOrder[todayName];
})

const submitData = () => {
  console.log(weekdaysData.value)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Weekly weight input</h2>
      <h4 class="text-center text-l font-bold leading-9 tracking-tight text-gray-900">Week {{ weekNumber }}, {{year}}</h4>
    </div>

    <div class="mt-10 sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitData">
        <div v-for="(day, index) in weekdaysData" :key="index" class="flex items-center justify-between ">
          <label for="day" class="block text-sm font-medium leading-6 text-gray-900">{{ weekdayLabels[index] }}</label>
          <div class="mt-2">
            <input type="number" v-model="weekdaysData[index]"  id="day" name="day"
                   :disabled="weekdayLabels[index] !== dayName"
                   :class="weekdayLabels[index] !== dayName ? 'cursor-not-allowed' : ''"
                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:text-gray-500"/>
          </div>
        </div>


        <div>
          <button type="submit"
                  class="flex w-full justify-center rounded-md bg-green-500 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>