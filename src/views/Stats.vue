<script setup>
import { computed } from 'vue'
import { useJobs } from '../stores/jobs'
const store = useJobs()
const counts = computed(() => {
  const s = { Wishlist:0, Applied:0, Interview:0, Offer:0, Rejected:0 }
  for (const j of store.jobs) s[j.status]++
  return s
})
</script>

<template>
  <div class="max-w-xl mx-auto p-6 space-y-6">
    <h1 class="text-xl font-semibold">Stats</h1>
    <ul class="space-y-2">
      <li v-for="(v,k) in counts" :key="k" class="flex justify-between border rounded px-3 py-2">
        <span>{{ k }}</span>
        <span class="font-medium">{{ v }}</span>
      </li>
    </ul>
  </div>
</template>
