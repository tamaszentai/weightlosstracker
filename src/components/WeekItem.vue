<script setup>
import {ref} from "vue";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/vue/20/solid";
import {defineProps} from "vue";

const props = defineProps(["weekData"]);
const isOpen = ref(false);

const weekToggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="mt-2 mb-2 grid grid-cols-1 sm:grid-cols-2">
    <div
        :class="isOpen ? 'bg-green-200 relative flex flex-row-reverse items-center space-x-3 rounded-t-xl border-t border-r border-l border-gray-300 px-6 py-5 cursor-pointer' : 'bg-green-200 shadow-md relative flex flex-row-reverse items-center space-x-3 rounded-xl border border-gray-300  px-6 py-5 focus-within:ring-2 cursor-pointer'"
        @click="weekToggle">
      <ChevronUpIcon v-if="isOpen" class="w-10 h-10 rounded-full p-1 bg-gray-100"/>
      <ChevronDownIcon v-else class="w-10 h-10 rounded-full p-1 bg-gray-100"/>
      <div class="min-w-0 flex-1">
        <span class="absolute inset-0" aria-hidden="true"/>
        <p class="text-sm font-medium text-gray-900">{{ weekData.year }} - Week {{ weekData.weekNumber }}</p>
        <p class="truncate text-sm text-gray-500">Weekly average: {{ weekData.weeklyAverage }}kg</p>
      </div>
    </div>
    <transition name="expand">
      <div v-if="isOpen"
           class="expanded bg-green-200 rounded-b-xl border-b border-r border-l border-gray-300 shadow-md">
        <div class="p-4">
          <p class="text-sm font-medium text-gray-900">Week start: {{ weekData.weekStartDate }}</p>
          <p class="text-sm font-medium text-gray-900">Week end: {{ weekData.weekEndDate }}</p>
          <div v-for="day in weekData.days" :key="day.date">
            <p class="text-sm font-medium text-gray-900">Date: {{ day.date }}</p>
            <p class="text-sm font-medium text-gray-900">Weight: {{ day.weight }}</p>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.expanded {
  height: 600px;
  overflow: hidden;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s;
}

.expand-enter,
.expand-leave-to {
  height: 0;
  overflow: hidden;
}
</style>
