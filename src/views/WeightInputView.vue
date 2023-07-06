<template>
  <div>
    <h2>Weekdays Input</h2>
    <form @submit.prevent="submitData">
    <div v-for="(value, index) in weekdaysData" :key="index">
      <label>{{ weekdayLabels[index] }}:</label>
      <input type="number" v-model="weekdaysData[index]" min="0" max="300" step=".1" />
    </div>
      <button type="submit"> Submit</button>
    </form>

  {{ calcWeeklyAverage }}
    <br />
    {{ dayNames }}
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';

const weekdaysData = ref([0, 0, 0, 0, 0, 0, 0]);
const weekdayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const d = new Date();
let day = d.getDay();

const calcWeeklyAverage = computed( () => {
    let average = 0;
    if (weekdaysData.value.every((day) => day > 0)) {
      const sum = weekdaysData.value.reduce((a, b) => a + b, 0);
      average = (sum / weekdaysData.value.length).toFixed(1);
    }
    return average
})

const dayNames = computed(() => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[day];
})

const submitData = () => {
  console.log(weekdaysData.value)
}

</script>