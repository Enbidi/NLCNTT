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