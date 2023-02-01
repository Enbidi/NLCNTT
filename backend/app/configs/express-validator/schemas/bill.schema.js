const billService = require("../../../services/BillService");
const saleService = require("../../../services/SaleService");

const saleChecker = async (saleId) => {
  if (!(await saleService.exists(saleId))) {
    throw new Error("Khuyến mãi không tồn tại");
  }
  return true;
}

const creationSchema = {
  'Content-Type': {
    in: ['headers'],
    isIn: ['application/json']
  },
  sale: {
    isMongoId: true,
    optional: true,
    custom: {
      options: (id) => {
        
      }
    }
  }
}

module.exports = {

}