import { computed } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

import { useStatisticsStore } from '../../stores/statistics'

export default function(dataKey, data) {
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
  var statisticsStore = useStatisticsStore()
  computed(() => data)
}