const express = require('express');
const AwaitList = require('../models/awaitList');
const Movie = require('../models/movie');
const Member = require('../models/member');

async function create(req,res,next){
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    let member = await Member.findOne({"_id":memberId});
    let movie = await Movie.findOne({"_id":movieId});

    let awaitList = new AwaitList({
        member:member,
        movie:movie,
    });

    awaitList.save().then(obj => res.status(200).json({
        msg:res.__('awaitlists.create.ok'),
        id:obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        msg:res.__('awaitlists.create.wrong'),
        obj:ex
    }));
}

function list(req,res,next){
    AwaitList.find()
    .populate(["_member", "_movie"])
    .then(objs => res.status(200).json({
        msg: res.__('awaitlists.list.ok'),
        objs:objs
    })).catch(ex => res.status(500).json({
        message:res.__('awaitlists.list.wrong'),
        obj:ex
    }));
}

function index(req,res,next){
    const id = req.params.id;
    AwaitList.findOne({"_id":id})
    .populate(["_member" ,"_movie"])
    .then(obj => res.status(200).json({
        message:res.__('awaitlists.index.ok',{ awaitlistId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('awaitlists.index.wrong',{ awaitlistId: id }),
        obj:ex
    }));
}

function replace(req,res,next){
    const id = req.params.id;
    const memberId = req.body.memberId ? req.body.memberId: "";
    const movieId = req.body.movieId ? req.body.movieId: "";

    let awaitList = new Object({
        memberId:memberId,
        movieId:movieId
    });

    AwaitList.findOneAndUpdate({"_id":id},awaitList,{new:true})
    .then(obj => res.status(200).json({
        msg:res.__('awaitlists.replace.ok',{ awaitlistId: id }),
        obj:obj
    }))
    .catch(ex => res.status(500).json({
        message:res.__('awaitlists.replace.wrong',{ awaitlistId: id }),
        obj:ex
    }))
}


function update(req, res, next){
    const id = req.params.id;
    let memberId = req.body.memberId;
    let movieId = req.body.movieId;
    let awaitList = new Object();
    if(memberId) awaitList._member = memberId;
    if(movieId) awaitList._movie = movieId;
    AwaitList.findOneAndUpdate({"_id":id}, awaitList)
            .then(obj => res.status(200).json({
                message:res.__('awaitlists.update.ok',{ awaitlistId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('awaitlists.update.wrong',{ awaitlistId: id }),
                obj:ex
            }));
}




function destroy(req,res,next){
    const id = req.params.id;
    AwaitList.findByIdAndRemove({"_id":id})
    .then(obj => res.status(200).json({
        message:res.__('awaitlists.destroy.ok',{ awaitlistId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('awaitlists.destroy.wrong',{ awaitlistId: id }),
        obj:ex
    }));
}


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};