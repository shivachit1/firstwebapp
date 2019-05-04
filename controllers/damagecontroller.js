const newDamage = require('../models/damage');


// Create and Save a new Damage
exports.create = (req, res) => {
    const value = req.session.token;
    const damage = new newDamage({

        userID:value,
        damageTitle:req.body.damageTitle,
        description:req.body.description,
        condition:req.body.condition

    });
    
    // Save damage in the database
    damage.save()
    .then(data => {
        //res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the damage."
        });
    });
    console.log(value);
   
    
};

// Retrieve and return all damages from the database.
exports.findAll = (req, res) => {
    newDamage.find()
    .then(docs => {
      console.log(docs);
      res.send(docs);
    })
    .catch(err => {
      console.error(err)
    });
};

// Find a single damage with a damageID
exports.findOne = (req, res) => {
    newDamage.findById(req.params.damageId)
    .then(damage => {
        if(!damage) {
            return res.status(404).send({
                message: "damage not found with id " + req.params.damageId
            });            
        }
        res.send(damage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Damage not found with id " + req.params.damageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving damage with id " + req.params.damageId
        });
    });
};

// Update a damage identified by the damageId in the request
exports.update = (req, res) => {
    
    // Find damage and update it with the request body
    newDamage.findByIdAndUpdate(req.params.damageId, {
        userID:req.userID,
        damageTitle:req.body.damageTitle,
        description:req.body.description,
        condition:req.body.condition
    }, {new: true})
    .then(damage => {
        if(!damage) {
            return res.status(404).send({
                message: "damage not found with id " + req.params.damageId
            });
        }
        console.log(damage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "damage not found with id " + req.params.damageId
            });                
        }
        return res.status(500).send({
            message: "Error updating damage with id " + req.params.damageId
        });
    });
};

// Delete a damage with the specified damageId in the request
exports.delete = (req, res) => {
    newDamage.findByIdAndRemove(req.params.damageId)
    .then(damage => {
        if(!damage) {
            return res.status(404).send({
                message: "Damage not found with id " + req.params.damageId
            });
        }
        res.send({message: "Damage deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Damage not found with id " + req.params.damageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete damage with id " + req.params.damageId
        });
    });
};


