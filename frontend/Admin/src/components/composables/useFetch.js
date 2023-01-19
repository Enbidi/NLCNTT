import { onMounted, ref } from 'vue'

export function useFetch(url, payload) {
  const res = ref(null)
  fetch(url, payload)
    .then(response => response.json())
    .then(data => res.value = data)
  return res
}