import { ref, onMounted, getCurrentInstance } from 'vue'

export default function(refKey) {
  const templateRef = ref(null)
  onMounted(() => {
    const currentInstance = getCurrentInstance()
    templateRef.value = currentInstance.refs[refKey]
  })
  return templateRef
}