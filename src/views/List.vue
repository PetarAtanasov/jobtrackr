<script setup>
import { ref, computed } from 'vue'
import { useJobs } from '../stores/jobs.js'
import { useRouter } from 'vue-router'

const store = useJobs()
const router = useRouter()
const q = ref('')
const status = ref('')

const filtered = computed(() =>
  store.jobs.filter(j => {
    const hay = (j.company + j.role + (j.tags||[]).join(' ')).toLowerCase()
    const okQ = hay.includes(q.value.toLowerCase())
    const okS = status.value ? j.status === status.value : true
    return okQ && okS
  })
)
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">JobTrackr</h1>
      <nav class="space-x-3">
        <router-link class="underline" to="/">List</router-link>
        <router-link class="underline" to="/new">New</router-link>
        <router-link class="underline" to="/stats">Stats</router-link>
      </nav>
    </header>

    <div class="flex gap-3">
      <input v-model="q" placeholder="Search…" class="border rounded px-3 py-2 w-full" />
      <select v-model="status" class="border rounded px-3 py-2">
        <option value="">All</option>
        <option>Wishlist</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>

    <ul class="grid md:grid-cols-2 gap-4">
      <li v-for="j in filtered" :key="j.id" class="border rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-medium">{{ j.role }} • {{ j.company }}</h3>
            <p class="text-sm text-gray-600">{{ j.location }}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded bg-gray-100">{{ j.status }}</span>
        </div>
        <div class="mt-3 space-x-3">
          <button class="underline" @click="router.push(`/edit/${j.id}`)">Edit</button>
          <a v-if="j.url" :href="j.url" target="_blank" class="underline">Post</a>
          <button class="underline text-red-600" @click="store.remove(j.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
