const Sequelize = require('sequelize')
const sequelize = require('./dbconfig.js')
const books = sequelize.define('bookss', {
  
   id:{
     
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
   },
   name: { type: Sequelize.STRING, allowNull:true },
   desc: { type: Sequelize.STRING, allowNull:true },
   shortdesc: { type: Sequelize.STRING, allowNull:true },
   price: { type: Sequelize.DOUBLE, allowNull:true },

   createdAt: Sequelize.DATE,
   updatedAt: Sequelize.DATE,
})
console.log("Create My Table  ...")

module.exports = books