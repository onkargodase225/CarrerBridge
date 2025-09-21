
import { Application } from "../models/application.model.js";
import {Job} from "../models/job.model.js"

export const applyJob=async(req,res)=>{
    try{
        const userId=req.id;
        const {id:jobId}=req.params; //  it similar to this const jobId=req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"Job id id required.",
                success:false
            })
        }

        //check if the user has already applied for the job
        const existingApplication=await Application.findOne({job:jobId,applicant:userId}) // already applid hoga user iss job ke leiye to existingapplication mil jayega

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this jobs",
                success:false
            });
        }

        // check if job exists
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false 
            })

        }

        // create new application
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);  // applications ek array hai usme sare newapplication job ke store rahege
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })

    }
    catch(error){
        console.log(error)
    }
}


// user ne jitne bhi job aaplied kiye hai vo
export const getAppliedJobs=async(req,res)=>{
    try{
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company'  // job ke andar company (aur phir company ke andar kuch info hogi)
            }
        });  // sort incresing order me de dega

        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false 
            })
        };

        return res.status(200).json({
            application,
            success:true
        })
    }
    catch(error){
        console.log(error); 
    }
}


// admin ke liye gettotal applicants for jobs

export const getApplicants=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'job not found',
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}

// update status of  applications liek pending,rejected,accepted

export const updateStatus=async(req,res)=>{
    try{
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        }

        // find the application by application id

        const application=await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        };

        // update the status
        application.status=status.toLowerCase(); 
        await application.save();

        return res.status(200).json({
            message:"status updated successfully.",
            success:true 
        })

    }
    catch(error){
        console.log(error)
    }
}


 