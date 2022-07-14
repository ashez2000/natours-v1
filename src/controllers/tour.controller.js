const Tour = require('../models/tour.model')
const asyncHandler = require('../utils/async-handler.utils')
const ApiFeatures = require('../utils/api-features.utils')

/**
 * @description - Get all tours
 * @route GET /api/v1/tours
 * @access Public
 */
const getAllTours = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(req.query, Tour.find())
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const tours = await features.queryModel

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

/**
 * @description - Get a tour by id
 * @route GET /api/v1/tours/:id
 * @access Public
 */
const getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id)

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

/**
 * @description - Create a tour
 * @route POST /api/v1/tours
 * @access Private
 */
const createTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

/**
 * @description - Update a tour
 * @route PUT /api/v1/tours/:id
 * @access Private
 */
const updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

/**
 * @description - Delete a tour
 * @route DELETE /api/v1/tours/:id
 * @access Private
 */
const deleteTour = asyncHandler(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id)

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
}
