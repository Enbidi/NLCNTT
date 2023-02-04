import { inject } from 'vue'
import { wait } from '../../utils'

export const useLoad = async function(work, millis) {
  var isLoading = inject('isLoading')
  isLoading.value = true
  await Promise.all([wait(millis), work()])
  isLoading.value = false
}