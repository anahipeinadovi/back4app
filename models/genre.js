
module.exports = (sequelize,type) =>{
    const Genre = sequelize.define('genres',{
        id: {type:type.INTEGER,primaryKey:true,autoIncrement:true},
        description:type.STRING,
        status: type.BOOLEAN
    });
    //nombre de mi tabla,objeto que va a llevar la configuracion de la tabla (columnas)
    return Genre
                                
};