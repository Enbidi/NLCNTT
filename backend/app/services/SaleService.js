const { Sale, PromotionSale, DiscountSale } = require("../models/Sale");
const BaseService = require("./BaseService");

class SaleService extends BaseService {
  constructor(model) {
    super(model);
  }
  async getActiveSales(selections, cb) {
    var filter = {
      end: {
        $gt: new Date()
      }
    }
    return await this.model.find(filter, selections).exec(cb)
  }
  async createSale(sale, cb) {
    switch(sale.type) {
    case 'promotion':
      sale = {
        start: sale.start,
        end: sale.end,
        percent: sale.saleVal,
        products: sale.products
      }
      return await new PromotionSale(sale).save(cb)
    case 'discount':
      sale = {
        start: sale.start,
        end: sale.end,
        value: sale.saleVal,
        products: sale.products
      }
      return await new DiscountSale(sale).save(cb)
    }
  }
  async getProductSales(productId, activeSales) {
    var sales = []
    activeSales ??= await this.getActiveSales()
    for (const sale of activeSales) {
      if (sale.products && sale.products.includes(productId)) {
        sales.push(sale)
      }
    }
    return sales
  }
}

module.exports = new SaleService(Sale);