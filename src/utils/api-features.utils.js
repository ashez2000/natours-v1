class ApiFeatures {
  constructor(reqQuery, queryModel) {
    this.reqQuery = reqQuery
    this.queryModel = queryModel
  }

  filter() {
    const queryObj = { ...this.reqQuery }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    this.queryModel = this.queryModel.find(JSON.parse(queryStr))

    return this
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.split(',').join(' ')
      this.queryModel = this.queryModel.sort(sortBy)
    } else {
      this.queryModel = this.queryModel.sort('-createdAt')
    }

    return this
  }

  limitFields() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.split(',').join(' ')
      this.queryModel = this.queryModel.select(fields)
    } else {
      this.queryModel = this.queryModel.select('-__v')
    }

    return this
  }

  paginate() {
    const page = this.reqQuery.page * 1 || 1
    const limit = this.reqQuery.limit * 1 || 20
    const skip = (page - 1) * limit

    this.queryModel = this.queryModel.skip(skip).limit(limit)

    return this
  }
}

module.exports = ApiFeatures
