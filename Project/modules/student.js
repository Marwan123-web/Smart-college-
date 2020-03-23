const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const studentSchema=mongoose.Schema({
    _id:{type:String,required:'please enter id'},
    name: { type: String,required:'Please Enter Your Name'},
    birth_date: { type: Date,required:'Please Enter Your Birthdate'},
    email: { type: String,required:'Please Enter Your Email'},
    password: { type: String,required:'Please Enter Your Password'},
    created_at: { type: Date, default: Date.now() },
    phone:{type:String},
    courses:[{ type: String, ref:"course" }]
});

studentSchema.pre('save',function(next){
    var student=this;
    if(student.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(student.password,salt,function(err,hash){
               if(err) return next(err);
               student.password=hash;
               next(); 
            })
        })
    }
    else{
        next();
    }
});

// studentSchema.methods.comparePassword=function(candidatePassword,checkpassword){

//     bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
//         if(err) {
//             return checkpassword(err)
//         };
//         return checkpassword(null,isMatch)
//     });
// };

module.exports=mongoose.model('student',studentSchema);