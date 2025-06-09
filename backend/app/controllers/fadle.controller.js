const db = require("../models");
const Item = db.fadle;
const Op = db.Sequelize.Op;

// Utwórz i zapisz nowy item
exports.create = async (req, res) => {
  try {
      // Validate request
      if (!req.body.nazwa) {
        res.status(400).send({
          message: "Zawartość nie może być pusta!"
        });
        return;
      }
      // Create a Item
      const item = {
        nazwa: req.body.nazwa,
        ikona: req.body.ikona,
        isplaceble: req.body.isplaceble ? 1:0,
        kategoria: req.body.kategoria,
        item1: req.body.item1,
        item2: req.body.item2,
        item3: req.body.item3,
        item4: req.body.item4,
        item5: req.body.item5,
        item6: req.body.item6
        
      };
      // Save Item in the database
      const items = await Item.create(item)
      res.send(items)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Podczas zapisywania wystąpił błąd."
    });

  }
}
  
// Retrieve all Items from the database.
exports.findAll = async (req, res) => {
    try {
      
      const nazwa = req.query.nazwa;
      var condition = nazwa ? { nazwa: { [Op.like]: `%${nazwa}%` } } : null;
      const przedm = await Item.findAll({
        //attributes:['id','nazwa','item1','item2','createdAt','updatedAt'],
        where: condition
      });
      res.send(przedm);
    } catch (error) {
        res.status(500).send({
          message:
          error.message || "Podczas odczytywania wystąpił błąd."
        });
    }
  };
  
// Find a single Item with an id
exports.findOne = async (req, res) => {
  try {
      const id = req.params.id;
      
      const item = await Item.findByPk(id)
      if (item) {
        res.send(item)
      } else {
        res.status(404).send({
          message: `Nie ma item o id=${id}.`
        });
      }
  } catch (err) {
    res.status(500).send({
      message: "Błąd szukania item o id=" + id
    });
  }
  };
  
// Update Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Item.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Item with id=" + id
        });
      });
  };
  
// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Item.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Item was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id
        });
      });
  };
    
// Delete all Item from the database.
exports.deleteAll = (req, res) => {
  Item.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Items ${nums} zostały usunięte!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas usuwania wystąpiły błędy."
      });
    });
};


  // Znajdź wszystkich uprawiających sport
exports.findAllSport = (req, res) => {
  Item.findAll({ where: { sport: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Podczas znajdowania Items wystąpiły błędy."
      });
    });
};
                                                  