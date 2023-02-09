import { defineStore } from "pinia";
import { useAlertsStore } from "./alerts";

function createUrl(url, params) {
  var url = new URL(url);
  for (var [name, val] of Object.entries(params)) {
    url.searchParams.append(name, val);
  }
  return url;
}

export const useStatisticsStore = defineStore("statisticsStore", {
  state: () => {
    return {
      bills: [],
      users: [],
      totalUser: null,
      totalProduct: null,
      revenueInCurrentMonth: null,
      totalBranch: null,
    };
  },
  getters: {
    alerts: () => useAlertsStore(),
  },
  actions: {
    async fetchBills(months = 12) {
      var url = createUrl("http://localhost:3000/admin/bill/statistic", {
        no_month: months,
      });
      var data = await this.alerts.callAPI("warning", url);
      this.bills = data.items;
    },
    async fetchUsers(months = 12) {
      var url = createUrl("http://localhost:3000/admin/user/statistic", {
        no_month: months,
      });
      var data = await this.alerts.callAPI("warning", url);
      this.users = data.items;
    },
    async fetchTotalUser() {
      if (this.totalUser != null) return;
      var url = "http://localhost:3000/admin/user/size";
      var data = await this.alerts.callAPI("warning", url);
      this.totalUser = data;
    },
    async fetchRevenueInCurrentMonth() {
      if (this.revenueInCurrentMonth != null) return;
      var url = "http://localhost:3000/admin/bill/revenue";
      var data = await this.alerts.callAPI("warning", url);
      this.revenueInCurrentMonth = data;
    },
    async fetchTotalProduct() {
      if (this.totalProduct != null) return;
      var url = "http://localhost:3000/admin/product/size";
      var data = await this.alerts.callAPI("warning", url);
      this.totalProduct = data;
    },
    async fetchTotalBranch() {
      if (this.totalBranch != null) return;
      var url = "http://localhost:3000/admin/branch/size";
      var data = await this.alerts.callAPI("warning", url);
      this.totalBranch = data;
    },
    async fetchNumericalDatas() {
      this.fetchTotalUser();
      this.fetchRevenueInCurrentMonth();
      this.fetchTotalProduct();
      this.fetchTotalBranch();
    },
  },
});
