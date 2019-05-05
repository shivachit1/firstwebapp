const router = require('express').Router();
const damageController = require('../controllers/damagecontroller');
const newDamage = require('../models/damage');

// Create a new Damage
router.post('/', damageController.create);

// Retrieve all Damages
router.get('/', damageController.findAll);

// Retrieve a single Damage with damageId
router.get('/:id', damageController.findOne);

// Update a Damage with damageId
router.post('/:id', damageController.update);


// Delete a Damage with damageId
router.delete('/:id', damageController.delete);

module.exports = router;