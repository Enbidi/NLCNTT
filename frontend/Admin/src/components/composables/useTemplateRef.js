import { ref, onMounted, getCurrentInstance } from 'vue'

export function useTemplateRef(refKey) {
  const templateRef = ref(null)
  onMounted(() => {
    const currentInstance = getCurrentInstance()
    console.log(currentInstance.refs[refKey].$methods)
    templateRef.value = currentInstance.refs[refKey]
  })
  return templateRef
}