import { useAlertsStore } from "../alerts";

export default async (alertsStore, url, opts) => {
  var response = await fetch(url, opts);
  var data = await response.json();
  if (!response.ok) {
    for (let err of data.errors) {
      alertsStore.push({
        content: err,
        type: "danger",
      });
    }
    return;
  }
  return data
};
