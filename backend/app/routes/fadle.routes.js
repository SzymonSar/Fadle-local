module.exports = app => {
    const fadle = require("../controllers/fadle.controller.js");

    var router = require("express").Router();
    // Create a new Table
    router.post("/", fadle.create);

    // Retrieve all Items
    router.get("/", fadle.findAll);
    
    // Retrieve a single Item with id
    router.get("/:id", fadle.findOne);
  
    // Update an Item with id
    router.put("/:id", fadle.update);
  
    // Delete an Item with id
    router.delete("/:id", fadle.delete);
  
    // Delete all Items
    router.delete("/", fadle.deleteAll);
  
    app.use('/api/fadle', router);
  };
  