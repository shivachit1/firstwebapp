const router = require('express').Router();
const damageController = require('../controllers/damagecontroller');

// Create a new Damage
router.post('/', damageController.create);

// Retrieve all Damages
router.get('/', damageController.findAll);

// Retrieve a single Damage with damageId
router.get('/:damageId', damageController.findOne);

// Update a Damage with damageId
router.put('/:damageId', damageController.update);

// Delete a Damage with damageId
router.delete('/:damageId', damageController.delete);

module.exports = router;