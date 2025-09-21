
import { Job } from "../models/job.model.js";

// admin /recruiter post karega job
export const postJOb=async (req,res)=>{
    try{
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;  //kis admin ne request mari hai uski id

        if(!title || !description || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements:requirements.split(","), // requirements string ke format mai aayi to usko split kar diya
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId // kon job ko post kar raha hai vo 
        })

        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }   
}

// student ke liye get alljobs
export const getAllJobs=async (req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={ 
            $or:[
                {title:{$regex:keyword, $options:"i"}} ,// i case sensitive ke liye agar capital letter hai ,small letter hai to 
                {description:{$regex:keyword, $options:"i"}}
            ]  
        }

        // This MongoDB query says:
        // "Find jobs where the title or description contains the keyword (case-insensitive)."

        //uper vale query se mai filterout karunga 
        const jobs=await Job.find(query).populate({
            path:"company" // mere ko company vale mai jana hai
        }).sort({createdAt:-1});    // query ke related job vala array

        // populate se puri ye company ki andar ki info aayi 
        // "company": {
        //         "_id": "681893ab56f97c480c067dd8",
        //         "name": "Microsoft",
        //         "userId": "6817780bce5f6c67c5b2fa90",
        //         "createdAt": "2025-05-05T10:32:11.677Z",
        //         "updatedAt": "2025-05-05T10:57:14.022Z",
        //         "__v": 0
        //},

        if(!jobs){ 
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })  
    }
    catch(error){ 
        console.log(error);
    }
} 

// student ke liye get job
export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications" // for apply now button handling
        });

        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };

        return res.status(200).json({
            job,success:true
        })
    }
    catch(error){
        console.log(error);
    }
}


//admin kitne job create kara hai abhi tak
export const getAdminJobs=async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}