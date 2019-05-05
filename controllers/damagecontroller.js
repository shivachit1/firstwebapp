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
        res.send(data);
        console.log('saved');
       
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the damage."
        });
    });
    
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
    newDamage.findById(req.params.id)
    .then(damage => {
        if(!damage) {
            return res.status(404).send({
                message: "damage not found with id " + req.params.id
            });            
        }
        res.send(damage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Damage not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving damage with id " + req.params.id
        });
    });
};

// Update a damage identified by the damageId in the request
    exports.update = (req, res) => {

        const damage = {
            userID:req.session.token,
            damageTitle:req.body.damageTitle,
            description:req.body.description,
            condition:req.body.condition
          
        };
      
        newDamage.findOneAndUpdate(
          { _id: req.params.id },
          { $set: damage },
          { new: true }
        ).then(damage => {
            console.log('updated');
            res.send('Damage has been updated with ID: '+damage._id);
            
      });
      
    }
// Delete a damage with the specified damageId in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    newDamage.findOneAndDelete(id)
      .exec()
      .then(()=> {
        res.status(204).json({
            success: true,
            message: 'Todo deleted successfuly'
          });
      }
      )
      .catch((err) => res.status(500).json({
        success: false,
      }));
};


