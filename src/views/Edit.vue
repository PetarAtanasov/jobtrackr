<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobs } from '../stores/jobs.js'

const route = useRoute()
const router = useRouter()
const store = useJobs()

const id = route.params.id
const isEdit = !!id
const model = reactive(isEdit ? { ...store.byId(id) } : {
  company: '', role: '', location: '', salary: '', url: '',
  status: 'Wishlist', tags: [], notes: ''
})

function save() {
  if (isEdit) store.update(id, model)
  else store.add(model)
  router.push('/')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <h1 class="text-xl font-semibold">{{ isEdit ? 'Edit' : 'New' }} Application</h1>
    <form class="space-y-3" @submit.prevent="save">
      <input v-model="model.company" placeholder="Company" class="border rounded px-3 py-2 w-full" required />
      <input v-model="model.role" placeholder="Role" class="border rounded px-3 py-2 w-full" required />
      <input v-model="model.location" placeholder="Location" class="border rounded px-3 py-2 w-full" />
      <input v-model="model.salary" placeholder="Salary" class="border rounded px-3 py-2 w-full" />
      <input v-model="model.url" placeholder="Job URL" type="url" class="border rounded px-3 py-2 w-full" />
      <select v-model="model.status" class="border rounded px-3 py-2 w-full">
        <option>Wishlist</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <textarea v-model="model.notes" placeholder="Notes" class="border rounded px-3 py-2 w-full min-h-32"></textarea>
      <div class="flex gap-2">
        <button class="border rounded px-4 py-2" type="submit">Save</button>
        <router-link class="underline" to="/">Cancel</router-link>
      </div>
    </form>
  </div>
</template>
