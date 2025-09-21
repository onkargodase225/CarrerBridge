
import {  Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// company register karani padegi agar aap recruiter ho to
export const registerCompany=async (req,res)=>{
    try{
        const {companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required.",
                success:false
            });
        }
        let company=await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"You can't register same company.",
                success:false
            })
        }
        company=await Company.create({
            name:companyName,
            userId:req.id 
        });

        return res.status(201).json({
            message:"Comapany registered successfullyl",
            company,
            success:true
        })
    }   
    catch{
        console.log(error);
    }
}


// jo bhi recruiter login hoga use uski hi register kiyi hui company dunga sare ki  sari thodi dunga
export const getCompany=async (req,res)=>{
    try{
        const userId=req.id;//logged in user id
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }

        return res.status(200).json({
            companies,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}


// get company by id
export const getCompanyById=async(req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:true
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}


export const updateCompany=async (req,res)=>{
    try{
        const {name,description,website,location}=req.body;
        const file=req.file; // file mil rahi hogi logo vagera company ka update karne ke liye   //req.file holds a file uploaded by the user, like an image/logo

        // idhar cloudinary ayeaga
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
        const logo=cloudResponse.secure_url;

        const updateData= {name,description,website,location,logo}
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true}); // obj new true dala kyki appko sara data mile
        
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"company information updated",
            success:true
        })
        
    }
    catch(error){
        console.log(error);
    }
}