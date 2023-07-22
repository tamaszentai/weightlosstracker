<script setup lang="ts">
import {GChart} from "vue-google-charts";
import {useWeightsStore} from "@/stores/weights";
import {onMounted, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import type {IWeek} from "@/interfaces/IWeek";

interface IAverageWeight {
  weekNumber: string;
  averageWeight: number;
}

const weightsStore = useWeightsStore();
const authStore = useAuthStore();
const {currentUser} = storeToRefs(authStore);
const weeks = ref<IWeek[]>([]);
const averageWeights = ref<IAverageWeight[] | undefined>([]);
const chartData = ref<any[]>([]);

onMounted(async () => {
  await weightsStore.fetchWeights(currentUser.value?.uid);
  weeks.value = weightsStore.allWeeks;
  weeks.value.sort((a, b) => {
    return +a.weekStartDate - +b.weekStartDate;
  });
})

watch(weeks, (newWeeksValue) => {
  if (newWeeksValue) {
  averageWeights.value = calculateAverageWeight();
  if (!averageWeights.value) return;
    chartData.value = [
      ['Date', 'Weight'],
      ...averageWeights.value.map((week) => [week.weekNumber, week.averageWeight]),
    ];
  }
});

const countNonZeroWeightObjects = (days) => {
  let count = 0;
  for (const day of days) {
    if (day.hasOwnProperty('weight') && day.weight !== "") {
      count++;
    }
  }
  return count < 7 ? count : 7;
}

const calculateAverageWeight = () => {
  const averageWeights = [];
  for (const week of weeks.value) {
    if (!week.days) return;
    let totalWeight = 0;
    for (const day of week.days) {
      totalWeight += (day.weight === "" ? 0 : day.weight)
    }
    const averageWeight = totalWeight / countNonZeroWeightObjects(week.days);
    averageWeights.push({weekNumber: `${week.year}-Week ${week.weekNumber}`, averageWeight: +averageWeight.toFixed(1)});
  }
  return averageWeights;
}


const chartOptions = {
  chart: {
    title: 'Weight loss',
    subtitle: 'Weight loss between x and y',
  },
  colors: ['#22c55e'],
};

</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Dashboard</h2>
    </div>
    <GChart v-if="chartData && chartData.length > 1"
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
    />
    <div v-else class="flex justify-center items-center h-64">
      <p class="text-gray-500">No data to display</p>
    </div>
  </div>
</template>