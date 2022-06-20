const db = require("./books.js");
const Book = db.books;
//const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    const book = {
        name: req.body.name,
        auther: req.body.auther,
        desc : req.body.desc,
        shortdesc : req.body.shortdesc,
        price : req.body.price
    };
    console.log(book)
    db.create(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Books."
        });
      });
  };

  exports.findAll = (req, res) => {
    
    db.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while reading the Books."
        });
      });
  };

  exports.findOne = (req, res) => {
    //console.log(req)
    const id = req.query['id'];
    db.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Book with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Book with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.query['id'];
    db.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating book with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.query['id'];
    db.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete book with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete book with id=" + id
        });
      });
  };