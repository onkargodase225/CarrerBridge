import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // console.log(fullname,email,phoneNumber);
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    
    // cloudinary for profile photo
    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashpassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Account created successfully:",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // email id db mai exist karti hai ya bhi nahi
    let user = await User.findOne({ email }); // let liya kyuki ise bad me isi code mai mai use kar pau
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // password matching agar email sahi hai to
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // check role is correct or not  student ya to recruiter
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesnt exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,    //   _id: "664a3be1c9f084b7b29e1150", userid  look like this 
    };

    // Assume user is a MongoDB user object like:
    // const user = {
    //   _id: "664a3be1c9f084b7b29e1150",
    //   name: "Onkar",
    //   email: "onkar@example.com"
    // };




    // jwt token generate karna hai
  
    ///particular usee ke liye token genereate kya 
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // login karne par ye bhej dunga
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,    //Sets how long the cookie will stay in the browser before it expires.
        httpsOnly: true,
        sameSite: "strict", //Prevents the browser from sending this cookie along with cross-site requests.
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber,bio,skills } = req.body;
//     const file=req.file; //resume ki file 
//     // data uri of file
//     const fileUri=getDataUri(file);
//      //cloudinary ayega idhar
//     const cloudResponse = await cloudinary.uploader.upload(file.buffer, {
//       resource_type: "auto",  // detects PDF correctly
//       folder: "resumes",
//       type: "upload",          // public access
//     });
  
   


//     //skillss string format se array me convert
//     let skillsArray;
//     if (skills){
//         skillsArray=skills.split(",")
//     }
  
//     const userId=req.id; //middleware authentication se ayegi
//     let user=await User.findById(userId);

//     if(!user){
//         return res.status(400).json({
//             message:"User not found",
//             success:false

//         })
//     }

//     // sirf  ek bhi to cheese update kar saakta hai user 
//     if(fullname) user.fullname=fullname
//     if(email) user.email=email
//     if(phoneNumber) user.phoneNumber=phoneNumber
//     if(bio)  user.profile.bio=bio
//     if(skills) user.profile.skills=skillsArray
    

//     // resume comes here
//     if(cloudResponse){
//       user.profile.resume=cloudResponse.secure_url// save the cloudinary url
//       user.profile.resumeOriginalName=file.originalname // save the original file name

//     }


    

//     await user.save(); // save in db
//     user = {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile,
//     };

//     return res.status(200).json({
//         message:"Profile updated successfully",
//         user,
//         success:true
//     })

//   } catch (error) {
//     console.log(error);
//   }
// };




// helper function to upload PDF buffer to Cloudinary







const uploadPdfBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // auto detects PDF
        folder: "resumes",
        type: "upload",         // public access
        public_id: `resume_${Date.now()}_${uuidv4()}`,

      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(file.buffer); // pipe the buffer to Cloudinary
  });
};




// const uploadPdfBuffer = (file) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "raw",   // 👈 force raw so PDFs always work
//         folder: "resumes",
//         type: "upload",         // keep it public
//         public_id: file.originalname.replace(/\.[^/.]+$/, ""), // optional
//         format: "pdf"           // ensure pdf extension
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );

//     stream.end(file.buffer);
//   });
// };



export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // resume file

    // Convert skills string to array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map(skill => skill.trim()); 
    }

    const userId = req.id; // from authentication middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Update profile fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Upload resume to Cloudinary if provided
    if (file) {
      const cloudResponse = await uploadPdfBuffer(file);

      if (cloudResponse) {
        user.profile.resume = cloudResponse.secure_url; // public URL
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    // Save updated user in DB
    await user.save();

    // Prepare response
    const responseUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: responseUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const viewResume = async (req, res) => {
  try {
    const userId = req.id; // from authentication middleware
    console.log("req.id from middleware:", req.id);
    const user = await User.findById(userId);
    console.log("user fetched for resume:", user?.email, user?._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.profile?.resume) {
      return res.status(404).json({
        message: "No resume found",
        success: false,
      });
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(user.profile.resume);
    
    if (!response.ok) {
      return res.status(404).json({
        message: "Resume file not found",
        success: false,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Set proper headers for PDF viewing in browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + (user.profile.resumeOriginalName || 'resume.pdf') + '"');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    // Send the PDF buffer
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const viewApplicantResume = async (req, res) => {
  try {
    const { applicantId } = req.params; // applicant ID from URL params
    const recruiterId = req.id; // from authentication middleware

    // Find the recruiter to verify they have permission
    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.role !== 'recruiter') {
      return res.status(403).json({
        message: "Access denied. Only recruiters can view applicant resumes.",
        success: false,
      });
    }

    // Find the applicant
    const applicant = await User.findById(applicantId);

    if (!applicant) {
      return res.status(404).json({
        message: "Applicant not found",
        success: false,
      });
    }

    if (!applicant.profile?.resume) {
      return res.status(404).json({
        message: "No resume found for this applicant",
        success: false,
      });
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(applicant.profile.resume);
    
    if (!response.ok) {
      return res.status(404).json({
        message: "Resume file not found",
        success: false,
      });
    }

    const pdfBuffer = await response.arrayBuffer();

    // Set proper headers for PDF viewing in browser
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + (applicant.profile.resumeOriginalName || 'resume.pdf') + '"');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    
    // Send the PDF buffer
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};












