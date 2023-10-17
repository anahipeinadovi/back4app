//funge como nuestro punto de partida para nuestros modelos 

const Sequelize = require('sequelize')


//Siempre hay que empezar popr tablas que si dan llaves foraneas pero  no reciben llaves foraneas 

//controladores en plural modelos en singular 


//importamos los modelos 
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');


/*hacer conexion con la base de datos 4 putnos 

        1)Nombre de la base de datos 
        2)Usuario 
        3)Contraseña
        4)Objeto de configuracion ORM 

*/

const sequelize = new Sequelize('video-club','root','holamundo',{
        host:'172.17.0.2',
        dialect: 'mysql' //formato que va a tomar el sequelize para interactuar con lla base de datos 
});


const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const Actor = actorModel(sequelize,Sequelize);
const Member = memberModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);




//****************ESTABLECEMOS LAS RELACIONES ENTRE TABLAS **********


//un genero puede tener muchas peliculas 
Genre.hasMany(Movie,{as: 'movies'}); //objeto que pide un atributo 'as' para nosotros darle un nombre de como se va a llamar el atributo de la llave foranea 

//una pelicula tiene un genero 
Movie.belongsTo(Genre,{as: 'genre'})

//un director puede tener muchas peliculas
Director.hasMany(Movie,{as:'movies'});

//una pelicula tiene un director 
Movie.belongsTo(Director,{as:'director'});

// // 1 actor participa en muchas peliculas  para poderlo mapear vamos a necesitar un  ... intermedio 
// MovieActor.belongsTo(Movie,{Movie:'movieId'});

// // En una pelicula participan muchos actores
// MovieActor.belongsTo(Actor,{foreignKey:'actorId'});


// Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreingKey: 'movieId'});

// En una pelicula participan muhos actores
MovieActor.belongsTo(Actor, {foreingKey: 'actorId'});

///////////////////

// Una pelicula tiene varias copias
Movie.hasMany(Copy, {as:'copies'});

// Una copia tiene una pelicula
Copy.belongsTo(Movie, {as:'movie'});

// Una copia tiene muchas reservas
Copy.hasMany(Booking,{as:'bookings'});

// Una reserva tiene una copia
Booking.belongsTo(Copy, {as:'copy'});

// Un miembro puede tener muchas reservas
Member.hasMany(Booking, {as:'bookings'});

// Una reserva tiene un miembro
Booking.belongsTo(Member, {as:'members'});




//belongs to many ayuda a hacer el cierre del otro lado de la relacion 
Movie.belongsToMany(Actor,{
        foreignKey: 'actorId',
        as: 'actors',
        through:'movies_actors'
});

Actor.belongsToMany(Movie,{
        foreignKey:'movieId',
        as:'movies',
        through:'movies_actors'
});




//sincroniza lo que tengamos en nuestro modelo hacia la base de datos 
sequelize.sync({
        force: true 
}).then(()=>{
        console.log('Base de datos actualizada ')
});

//se exportar todos los modelos que tengamos en un objeto 

module.exports= {
        Director,
        Genre,
        Movie,
        Actor,
        Member,
        Booking, 
        Copy
};