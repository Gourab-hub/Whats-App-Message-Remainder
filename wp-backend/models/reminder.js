const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    reminderMsg:{
        type:String,
        required: true,
    } ,
    remindAt:{
        type:String,
        required: true,
    } ,
    isReminded: Boolean
})
mongoose.model("Reminder", reminderSchema)