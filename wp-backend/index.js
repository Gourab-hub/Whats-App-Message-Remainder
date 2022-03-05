require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const PORT =  process.env.PORT || 5000
const {MONGOURI}= require('./config/keys')

// const Reminder = mongoose.model("Reminder")

//H7vlfUKsLGU7Gwzk
//H7vlfUKsLGU7Gwzk
//mongodb+srv://whatsapp-clone:<password>@cluster0.doxnw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//App config




const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


const Reminder= require('./models/reminder')
app.use(require('./routes/users'))



mongoose.connect(MONGOURI,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
mongoose.connection.on('connected', ()=>{
    console.log("connected mongodb yahh................................................................")
})
mongoose.connection.on('error', (err)=>{
    console.log(' err connected',err)
})

// require('./models/reminder')
// require('./models/post')

// app.use(express.json());
// app.use(require('./routes/users'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))



// const reminderSchema = new mongoose.Schema({
//     reminderMsg: String,
//     remindAt: String,
//     isReminded: Boolean
// })
// const Reminder = new mongoose.model("reminder", reminderSchema)


// setInterval(() => {
//     Reminder.find({}, (err, reminderList) => {
//         if(err) {
//             console.log(err)
//         }
//         if(reminderList){
//             reminderList.forEach(reminder => {
//                 if(!reminder.isReminded){
//                     const now = new Date()
//                     if((new Date(reminder.remindAt) - now) < 0) {
//                         Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
//                             if(err){
//                                 console.log(err)
//                             }
//                             const accountSid = process.env.ACCOUNT_SID 
//                             const authToken = process.env.AUTH_TOKEN
//                             const client = require('twilio')(accountSid, authToken); 
//                             client.messages 
//                                 .create({ 
//                                     body: reminder.reminderMsg, 
//                                     from: 'whatsapp:+14155238886',       
//                                     to: 'whatsapp:+918167709533' //YOUR PHONE NUMBER INSTEAD OF 8888888888
//                                 }) 
//                                 .then(message => console.log(message.sid)) 
//                                 .done()
//                         })
//                     }
//                 }
//             })
//         }
//     })
// },1000);


/*
app.get("/getAllRemindre", (req,res) => {
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
app.post("/addRemindre", (req,res) => {
    const {reminderMsg,remindAt} =req.body
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
app.post("/deleteRemindre", (req,res) => {
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
*/
// app.use(require('./routes/users'))

// const accountSid = process.env.ACCOUNT_SID; 
// const authToken = process.env.AUTH_TOKEN; 
// const client = require('twilio')(accountSid, authToken); 
 
// client.messages 
//       .create({ 
//          body: 'hi gb 1', 
//          from: 'whatsapp:+14155238886',       
//          to: 'whatsapp:+918167709533' 
//        }) 
//       .then(message => console.log(message.sid)) 
//       .done();










// app.get("/", (req,res) => {
//     res.send("All is well backend")
// });


if(process.env.NODE_ENV=="production"){
    app.use(express.static('wp-frontend/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'wp-frontend','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running on port on ", PORT)
});