const BaseService = require("./BaseService");
const billDetailService = require("./BillDetailService");
const saleService = require("./SaleService");
const { Bill } = require("../models/Bill");

class BillService extends BaseService {
  constructor(model) {
    super(model);
  }

  async populatedDetails(filter, limit, cb) {
    this.model.find(filter).populate("details").limit(limit).exec(cb);
  }

  async fetchBillsFromUser(userId, cb) {
    var filter = { user: userId };
    if (cb) {
      this.model.find(filter).populate("details").exec(cb);
      return;
    }
    return await this.model.find(filter).populate("details").exec();
  }
  populateDetailsWithTotal(filter, limit, cb) {
    Bill.fetchDetailsWithTotal(filter, limit, cb);
  }
  async createBill(bill, details) {
    var bill = new this.model(bill);
    var activeSales = await saleService.getActiveSales("_id products");
    if (Array.isArray(activeSales) && activeSales.length != 0) {
      // Awaiting for all details to be saved,
      // otherwise bill's populating will receive
      // empty array
      await Promise.all(
        details.map(async (detail) => {
          var sales = await saleService.getProductSales(detail.product, activeSales);
          await billDetailService.save({
            quantity: detail.quantity,
            product: detail.product,
            bill: bill._id,
            sales: sales.length != 0 ? sales : undefined
          });
        })
      );
    }
    await bill.save();
    return await this.model.fetchDetailsWithTotal({ _id: bill._id }, 1)
    // return bill;
  }
  async getMonthlyStatistics(limit, cb) {
    return await Bill.getMonthlyRevenue(limit, cb);
  }
  getRevenueInCurrentMonth(cb) {
    var date = new Date()
    var currentMonth = date.getMonth() + 1
    return Bill.getRevenueInSpecificMonth(currentMonth, cb)
  }
}

module.exports = new BillService(Bill);
