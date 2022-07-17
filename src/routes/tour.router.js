const express = require('express')
const tourController = require('../controllers/tour.controller')
const { protect } = require('../middlewares/auth.middleware')

const router = express.Router()

router
  .route('/')
  .get(tourController.getAllTours)
  .post(protect, tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(protect, tourController.updateTour)
  .delete(protect, tourController.deleteTour)

module.exports = router
