const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Must use a valid email address'], 
    },
    password:{
        type:String,
        minLength:5
    }
});

userSchema.pre('save', async function(){
    if(this.isNew || this.isModified('password')){
        const saltRound = 10;
        this.password = await bcrypt.hash(this.password,saltRound);
    }
});

userSchema.methods.isCorrectPassword = async function(password){
    return bcrypt.compare(password, this.password);
}
module.exports = model("User", userSchema);