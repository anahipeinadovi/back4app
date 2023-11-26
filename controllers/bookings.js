const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');



async function create(req,res,next){
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId})


    let booking = new Booking({
        date:date,
        member:member,
        copy:copy
    });

    booking.save().then(obj => res.status(200).json({
        msg:res.__('bookings.create.ok'),
        id:obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        msg:res.__('bookings.create.wrong'),
        obj:ex
    }));
    
}

function list(req,res,next){
    Booking.find()
    .populate("_member _copy").then(objs => res.status(200).json({
        msg: res.__('bookings.list.ok'),
        objs:objs
    })).catch(ex => res.status(500).json({
        message:res.__('bookings.list.wrong'),
        obj:ex
    }));
}

function index(req,res,next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).populate("_member _copy")
    .then(obj => res.status(200).json({
        message:res.__('bookings.index.ok',{ bookingId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('bookings.index.wrong',{ bookingId: id }),
        obj:ex
    }))
}

function replace(req,res,next){
    const id = req.params.id;
    let date = req.body.date ? req.body.date:"";
    let memberId = req.body.memberId ? req.body.memberId:"";
    let copyId = req.body.copyId ? req.body.copyId:"";

    let booking = new Object({
        date:date,
        memberId:memberId,
        copyId:copyId
    });

    Booking.findOneAndUpdate({"_id":id},booking,{new:true})
    .then(obj => res.status(200).json({
        msg:res.__('bookings.replace.ok',{ bookingId: id }),
        obj:obj
    }))
    .catch(ex => res.status(500).json({
        message:res.__('bookings.replace.wrong',{ bookingId: id }),
        obj:ex
    }));


}



function update(req, res, next){
    const id = req.params.id;
    let date = req.body.date;
    let memberId = req.body.memberId;
    let copyId = req.body.copyId;
    let booking = new Object();
    if(date) booking._date = date;
    if(memberId) booking._member = memberId;
    if(copyId) booking._copy = copyId;
    Booking.findOneAndUpdate({"_id":id}, booking)
            .then(obj => res.status(200).json({
                message:res.__('bookings.update.ok',{ bookingId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('bookings.update.wrong',{ bookingId: id }),
                obj:ex
            }));
}


function destroy(req, res, next){
    const id = req.params.id;
    Booking.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__('bookings.destroy.ok',{ bookingId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('bookings.destroy.wrong',{ bookingId: id }),
        obj:ex
    }));
}


module.exports = {
    create, list, index, replace, update, destroy
};