<script setup lang="ts">
import {GChart} from "vue-google-charts";
import {useWeightsStore} from "@/stores/weights";
import {onMounted, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import type {IWeek} from "@/interfaces/IWeek";
// import WeekItem from "@/components/WeekItem.vue";
import { defineAsyncComponent } from 'vue'

const WeekItem = defineAsyncComponent(() => import('@/components/WeekItem.vue'))
const weightsStore = useWeightsStore();
const authStore = useAuthStore();
const {currentUser} = storeToRefs(authStore);
const weeks = ref<IWeek[]>([]);
const reverseWeeks = ref<IWeek[]>([]);
const chartData = ref<any[]>([]);

onMounted(async () => {
    await weightsStore.fetchWeights(currentUser.value?.uid);
    weeks.value = [...weightsStore.allWeeks];
    reverseWeeks.value = [...weightsStore.allWeeks];
    weeks.value.sort((a, b) => {
        return +a.weekStartDate - +b.weekStartDate;
    });
    reverseWeeks.value.sort((a, b) => {
        return +b.weekNumber - +a.weekNumber;
    });
})

watch(weeks, (newWeeksValue) => {
    if (newWeeksValue) {
        chartData.value = [
            ['Date', 'Weight'],
            ...weeks.value.map((week) => [`${week.year}-Week ${week.weekNumber}`, week.weeklyAverage]),
        ];
    }
});

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
        <div class="mt-10">
            <WeekItem v-for="week in reverseWeeks" :key="week.weekStartDate.toDateString()" :week-data="week"/>
        </div>
    </div>
</template>