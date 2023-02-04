const { Product, ProductSchema, SpecsSchema } = require("../models/Product")
const BaseService = require("./BaseService")

// const productSchemaFields = Object.keys(ProductSchema.paths)
const productSchemaFields = [
  "name",
  "price",
  "img",
  "description",
  "origin",
  "branch",
]
// const specsSchemaFields = Object.keys(SpecsSchema.paths)
const specsSchemaFields = [
  "screen",
  "os",
  "frontCamera",
  "backCamera",
  "chip",
  "SIMs",
  "charging",
  "RAM",
  "diskSize",
]
class ProductService extends BaseService {
  constructor(model) {
    super(model)
  }
  fetchLimitWithOriginAndBranch(filter, limit, cb) {
    this.model
      .find(filter)
      .limit(limit)
      .populate("origin")
      .populate("branch")
      .exec(cb)
  }
  _adjustProductFromFlattenObj(product, obj) {
    for (let [key, val] of Object.entries(obj)) {
      if (productSchemaFields.includes(key)) {
        product[key] = val
      } else if (specsSchemaFields.includes(key)) {
        product.specs[key] = val
      }
    }
  }
  async updateProduct(id, obj, cb) {
    var product = await super.findOne({ _id: id })
    this._adjustProductFromFlattenObj(product, obj)
    return await product.save(cb)
  }
  async createProduct(obj, cb) {
    var product = new this.model()
    product.specs = {}
    this._adjustProductFromFlattenObj(product, obj)
    return await product.save(cb)
  }
  async findProductByName(name, cb) {
    Product.findProductByName(name, cb)
  }
  async fetchComments(filter, cb) {
    await this.model.findOne(filter, "_id").populate("comments").exec(cb)
  }
  findOne(filter, cb) {
    this.model.findOne(filter).populate("branch").populate("origin").exec(cb)
  }
  async getTopPurchasedProducts(top, cb) {
    return await this.model
      .find()
      .populate("billsCount")
      .sort("-billsCount")
      .limit(top)
      .populate("inSales")
      .exec(cb)
  }
}

module.exports = new ProductService(Product)
