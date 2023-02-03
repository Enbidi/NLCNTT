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