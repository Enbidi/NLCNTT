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

export const formatDate = function(date) {
  date = date instanceof Date ? date : new Date(date);
  if (isNaN(date)) {
    return
  }
  var d = String.prototype.padStart.call(date.getDate(), 2, '0')
  var m = String.prototype.padStart.call(date.getMonth(), 2, '0')
  var y = date.getFullYear()
  return `${d}-${m}-${y}`
}