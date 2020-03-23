var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/attendance_manager',
{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Your DB (attendance_manager) Connected");
});
