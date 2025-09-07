// src/stores/jobs.js
import { defineStore } from 'pinia'

export const useJobs = defineStore('jobs', {
  state: () => ({ jobs: [] }),
  persist: true, 
  getters: {
    byId: (s) => (id) => s.jobs.find(j => j.id === id),
  },
  actions: {
    add(job) {
      job.id = crypto.randomUUID()
      job.createdAt = new Date().toISOString()
      this.jobs.unshift(job)
    },
    update(id, patch) {
      const i = this.jobs.findIndex(j => j.id === id)
      if (i !== -1) this.jobs[i] = { ...this.jobs[i], ...patch }
    },
    remove(id) {
      this.jobs = this.jobs.filter(j => j.id !== id)
    }
  }
})
