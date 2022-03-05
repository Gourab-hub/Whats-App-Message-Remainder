require('dotenv').config()
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reminder =  mongoose.model("Reminder")
const {ACCOUNT_SID,AUTH_TOKEN}= require('../config/keys')
// const Reminder= require('./models/reminder')
// router.get('/',(req,res)=>{
//     res.send("hello ")
// })


setInterval(() => {
    Reminder.find({}, (err, reminderList) => {
        if(err) {
            console.log(err)
        }
        if(reminderList){
            reminderList.forEach(reminder => {
                if(!reminder.isReminded){
                    const now = new Date()
                    if((new Date(reminder.remindAt) - now) < 0) {
                        Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                            if(err){
                                console.log(err)
                            }
                            // const accountSid = process.env.ACCOUNT_SID 
                            // const authToken = process.env.AUTH_TOKEN
                            const accountSid = ACCOUNT_SID 
                            const authToken = AUTH_TOKEN


                            const client = require('twilio')(accountSid, authToken); 
                            client.messages 
                                .create({ 
                                    body: reminder.reminderMsg, 
                                    from: 'whatsapp:+14155238886',       
                                    to: 'whatsapp:+918167709533' //YOUR PHONE NUMBER INSTEAD OF 8888888888
                                }) 
                                .then(message => console.log(message.sid)) 
                                .done()
                        })
                    }
                }
            })
        }
    })
},1000);


router.get("/getAllRemindre", (req,res) => {
    Reminder.find({},
        (err,reminderList)=>
        {
            if(err) {
                console.log(err)
            }else{
                res.send(reminderList)
            }
        })
 
});


router.post("/addRemindre", (req,res) => {
    const {reminderMsg,remindAt} =req.body
    if (!reminderMsg || !remindAt ) {
       return res.status(422).json({ error: "Please add all required fields" })
    }


    const reminder=new Reminder({
        reminderMsg,
        remindAt,
        isReminded:false
    })
    reminder.save(err=>{
        if(err){
            console.log(err)
        }
        Reminder.find({},
            (err,reminderList)=>
            {
                if(err) {
                    console.log(err)
                }else{
                    res.send(reminderList)
                }
            })


    })
});

router.post("/deleteRemindre", (req,res) => {
    Reminder.deleteOne({_id:req.body.id},()=>{
        Reminder.find({},(err,reminderList)=>
            {
                if(err) {
                    console.log(err)
                }else{
                    res.send(reminderList)
                }
            })
    })

});




module.exports = router