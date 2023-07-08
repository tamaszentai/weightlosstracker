<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {useRoute} from "vue-router";

const currentRoute = useRoute();
const today = new Date();
const year = today.getFullYear();
const firstDay = new Date(year, 0, 1);
const pastDays = (today - firstDay) / 86400000; // 86400000 ms = 1 nap
const weekNumber = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);

const weeks = [
  {
    [`${2023}-${27}`]: {
      year: 2023,
      weekNumber: 27,
      weekStart: new Date(2023, 5, 26),
      '26-06-2023': {
        dayName: 'Monday',
        currentWeight: 130.2,
      },
      '27-06-2023': {
        dayName: 'Tuesday',
        currentWeight: 130.0,
      },
      '28-06-2023': {
        dayName: 'Wednesday',
        currentWeight: 129.8,
      },
      '29-06-2023': {
        dayName: 'Thursday',
        currentWeight: 129.7,
      },
      '30-06-2023': {
        dayName: 'Friday',
        currentWeight: 129.5,
      },
      '01-07-2023': {
        dayName: 'Saturday',
        currentWeight: 128.7,
      },
      '02-07-2023': {
        dayName: 'Sunday',
        currentWeight: 128.5,
      },
    },
  },

  {
    [`${2023}-${28}`]: {
      year: 2023,
      weekNumber: 28,
      weekStart: new Date(2023, 6, 3),
      '03-07-2023': {
        dayName: 'Monday',
        currentWeight: 128.2,
      },
      '04-07-2023': {
        dayName: 'Tuesday',
        currentWeight: 128.2,
      },
      '05-07-2023': {
        dayName: 'Wednesday',
        currentWeight: 127.8,
      },
      '06-07-2023': {
        dayName: 'Thursday',
        currentWeight: 127.7,
      },
      '07-07-2023': {
        dayName: 'Friday',
        currentWeight: 127.5,
      },
      '08-07-2023': {
        dayName: 'Saturday',
        currentWeight: 127.4,
      },
      '09-07-2023': {
        dayName: 'Sunday',
        currentWeight: 127.2,
      },
    },
  }

  ];

console.log(weeks);


</script>
<template>
  <nav-bar v-if="currentRoute.fullPath !== '/'"/>
  <RouterView/>
</template>

<style scoped>
</style>
