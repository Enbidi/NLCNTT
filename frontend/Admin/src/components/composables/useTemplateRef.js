import { ref, onMounted, getCurrentInstance } from 'vue'

export function useTemplateRef(refKey) {
  const templateRef = ref(null)
  onMounted(() => {
    const currentInstance = getCurrentInstance()
    templateRef.value = currentInstance.refs[refKey]
  })
  return templateRef
}