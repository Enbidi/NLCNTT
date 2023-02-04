export const group = function(array, groupBy) {
  var res = new Map()
  for (let el of array) {
    let groupKey = el[groupBy]
    if (res.get(groupKey) == undefined) {
      res.set(groupKey, [])
    }
    res.get(groupKey).push(el)
  }
  return res
}

export const wait = function(millis) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis)
  })
}

export const showLoading = async function(isLoading, work, millis) {
  isLoading.value = true
  if (work.constructor.name == 'AsyncFuncion') {
    await Promise.all([wait(millis), work()])
  }
  else {
    await wait(millis)
    work()
  }
  isLoading.value = false
}