const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const UserSchema=new mongoose.Schema({
    Username:{type:String,required:[true,"Please enter a name"]},
    Email:{type:String,required:[true,"Please enter an email"],unique:[true,"Already Belongs to Someone"]},
    MyProjects:[{type:mongoose.Schema.Types.ObjectId,ref:'Project'}],
    MyTasks:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}],
    AssignedByMe:[{type:mongoose.Schema.Types.ObjectId,ref:'Task'}],
    Password:{type:String},
    google_id:String,
    git_id:String,
    Photo:String

})
UserSchema.pre('save', async function (next) {
    if (!this.isModified('Password') || !this.isNew) return next();
    this.Password = await bcrypt.hash(this.Password, 12);
    next();
  });
  UserSchema.methods.checkPassword = async function (
    EnteredPassword,
    UserPassword
  ) {
    return await bcrypt.compare(EnteredPassword, UserPassword);
  };

const User=mongoose.model('User',UserSchema)
module.exports= User