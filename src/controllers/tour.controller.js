const Tour = require('../models/tour.model')
const asyncHandler = require('../utils/async-handler')

const getAllTours = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const tours = await features.query

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
})

const getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id)

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

const createTour = asyncHandler((req, res ,next) => {
  const tour = await Tour.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      tour,
    },
  })
})

const updateTour = asyncHandler((req, res ,next) => {
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

const deleteTour = asyncHandler((req, res ,next) => {
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
