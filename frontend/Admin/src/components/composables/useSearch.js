import { ref } from 'vue'
import { useSearchStore } from "../../stores/search"

export function useSearch(url, mainStore) {
  const searchStore = useSearchStore();
  const result = ref(null);
  searchStore.$subscribe((_, state) => {
    fetch(`${url}/find?keyword=${state.val}`)
      .then(res => res.json())
      .then(data => result.value = { items: data.items, selectedItems: [] })
  });
  mainStore.$subscribe((_, state) => {
    result.value = state
  }, { immediate: true })
  return {
    searchStore,
    result
  };
}