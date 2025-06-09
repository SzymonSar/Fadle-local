module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("Item", {
      nazwa: {
        type: DataTypes.STRING
      },
      ikona: {
        type: DataTypes.STRING
      },
      isplaceble: {
        type: DataTypes.BOOLEAN
      },
      kategoria: {
        type: DataTypes.STRING
      },
      item1: {
        type: DataTypes.STRING
      },
      item2: {
        type: DataTypes.STRING
      },
      item3: {
        type: DataTypes.STRING
      },
      item4: {
        type: DataTypes.STRING
      },
      item5: {
        type: DataTypes.STRING
      },
      item6: {
        type: DataTypes.STRING
      }
      
    });
  
    return Item;
  };
  