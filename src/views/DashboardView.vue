<script setup lang="ts">
import {GChart} from "vue-google-charts";
import {useWeightsStore} from "@/stores/weights";
import {onMounted} from "vue";
import {getAuth} from "firebase/auth";

const WeightsStore = useWeightsStore();
const today = new Date();
const year = today.getFullYear();
const firstDay = new Date(year, 0, 1);
const pastDays = (today - firstDay) / 86400000; // 86400000 ms = 1 nap
const weekNumber = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);

onMounted(async () => {
  const currentUser = await getAuth().currentUser;
  if (currentUser) {
    await WeightsStore.fetchWeights(currentUser);
  }
})

const weeks = [
  {
    year: 2023,
    weekNumber: 27,
    weekStartDate: new Date(2023, 5, 26),
    weekEndDate: new Date(2023, 6, 2),
    days: [
      {
        date: new Date(2023, 5, 26),
        currentWeight: 130.2,
      },
      {
        date: new Date(2023, 5, 27),
        currentWeight: 130.0,
      },
      {
        date: new Date(2023, 5, 28),
        currentWeight: 129.8,
      },
      {
        date: new Date(2023, 5, 29),
        currentWeight: 129.7,
      },
      {
        date: new Date(2023, 5, 30),
        currentWeight: 129.5,
      },
      {
        date: new Date(2023, 6, 1),
        currentWeight: 128.7,
      },
      {
        date: new Date(2023, 6, 2),
        currentWeight: 128.5,
      },
    ],
  },

  {
    year: 2023,
    weekNumber: 28,
    weekStartDate: new Date(2023, 6, 3),
    weekEndDate: new Date(2023, 6, 9),
    weeklyAverage: 0,
    days: [{
      date: new Date(2023, 6, 3),
      currentWeight: 128.2,
    },
      {
        date: new Date(2023, 6, 4),
        currentWeight: 128.2,
      },
      {
        date: new Date(2023, 6, 5),
        currentWeight: 127.8,
      },
      {
        date: new Date(2023, 6, 6),
        currentWeight: 127.7,
      },
      {
        date: new Date(2023, 6, 7),
        currentWeight: 127.5,
      },
      {
        date: new Date(2023, 6, 8),
        currentWeight: 127.4,
      },
      {
        date: new Date(2023, 6, 9),
        currentWeight: 127.2,
      },
    ],
  }
];

// console.log(weeks)
//
// // find the latest week
// const latestWeek = weeks[weeks.length - 1];
// const calculateAverageWeight = (latestWeek) => {
//   const avg = latestWeek.days.reduce((acc, day) => {
//     return acc + day.currentWeight;
//   }, 0) / latestWeek.days.length;
//   latestWeek.weeklyAverage = (avg.toFixed(1));
// }
//
// calculateAverageWeight(latestWeek);
//
// console.log(weeks)





const calculateAverageWeight = () => {
  const averageWeights = [];
  for (const week of weeks) {
    let addedDays = week.days.length;
    let totalWeight = 0;
    for (const day of week.days) {
      totalWeight += day.currentWeight;
    }
    const averageWeight = totalWeight / addedDays;
    averageWeights.push({averageWeight: +averageWeight.toFixed(1), weekNumber: `${week.year}-Week ${week.weekNumber}`});
  }
  return averageWeights;
}

const vmi = calculateAverageWeight().map((week) => {
  return [week.weekNumber, week.averageWeight];
});

const chartData = [
  ['Date', 'Weight'],
  ...vmi,
];
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
    <GChart
        type="ColumnChart"
        :data="chartData"
        :options="chartOptions"
    />
  </div>
</template>

<style scoped>

</style>