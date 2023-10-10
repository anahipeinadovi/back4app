
const Sequelize = require('sequelize');




/*exportamos  la libreria y le damos el modelo */
//aqui se crea la tabla y se define mediante un objeto las columnas de la tabla 
module.exports = (sequelize,type) =>{
    const Director = sequelize.define('directors',({//2 parametros ( nombre de la tabla,objeto que debe contenr )
        id: {type: type.INTEGER,primaryKey:true,autoIncrement:true},
        name: type.STRING,
        last_name: type.STRING
    }));
    return Director;
}





