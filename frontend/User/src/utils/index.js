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
  var _, result
  if (work instanceof Function) {
    if (work.constructor.name == 'AsyncFuncion') {
      [_, result] = await Promise.all([wait(millis), work()])
    }
    else {
      await wait(millis)
      work()
    }
  } else if (work instanceof Promise) {
    [_, result] = await work
  }
  isLoading.value = false
  return result
}

export const convertFormDataToJSON = function(formData) {
  var obj = {}
  for (let [key, val] of formData.entries()) {
    if (obj[key] == undefined) {
      obj[key] = val
    } else {
      if (!(obj[key] instanceof Array)) {
        obj[key] = [obj[key]]
      }
      obj[key].push(val)
    }
  }
  return JSON.stringify(obj)
}
