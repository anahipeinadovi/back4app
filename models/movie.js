const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _title: String,
    //declaracion de una referencia 
    _director: {
        type: mongoose.Schema.ObjectId,
        ref:'Director'
    },
    _genre:{
        type: mongoose.Schema.ObjectId,
        ref:'Genre'
    },
    _actors:[{
        type: mongoose.Schema.ObjectId,
        ref:'Actor'
    }
    ]
});

class Movie{
    
    constructor(title,director,genre,actors){
        this._title = title,
        this._director = director ,
        this._genre = genre,
        this._actors = actors
    }

    /*title */
    get title(){
        return this._title;
    }

    set title(v){
        this._title = v;
    }

    /*director */
    get director(){
        return this._director;
    }

    set director(v){
        this._director = v;
    }

    /*genre */
    get genre(){
        return this._genre;

    }

    set genre(v){
        this._genre = v;
    }

    /**actors */

    get actors(){
        return this._actors;
    }

    set actors(v){
        this._actors = v;
    }





    
}

schema.loadClass(Movie);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', schema);