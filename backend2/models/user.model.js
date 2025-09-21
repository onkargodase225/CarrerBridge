
//schema

import mongoose from "mongoose";
const userSchema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    // kon login karne vala hai
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String}
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String} ,// URL de dunga string ke format mai
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, // 'company' module
        profilePhoto:{
            type:String,
            default:" "
        }

    }



},{timestamps:true});

export const User=mongoose.model('User',userSchema);
