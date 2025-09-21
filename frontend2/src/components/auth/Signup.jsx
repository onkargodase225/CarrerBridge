
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup} from "@/components/ui/radio-group"
import { Button } from "../ui/button"; 
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'
import axios from 'axios';
import { toast } from 'sonner' 
import { useDispatch, useSelector } from 'react-redux'
import store from '../../redux/store'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    // data get karna hai jo bhi user ne type vageara kiya hai
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });

    const {loading,user} =useSelector(store=>store.auth) // loding ko lekke aya . lane ke liye useselctor use karte hai
    const navigate=useNavigate();
    const dispatch=useDispatch(); 
    
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
           // ...initial input to ayega hi //event.target.name se uski value change karni hai
    }

    // file ke liye alag se
    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]}); // 0 index pe jo hoga vo mujhe dede
    }

    const submitHandler=async(e)=>{

        e.preventDefault();  
        // mujhe yahape photo bito bhi lena hai isliye ye formdata use karunga
        const formData=new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("password",input.password)
        formData.append("role",input.role)
        
        // agar file bhi ati hai input mai to
        if(input.file){
            formData.append("file",input.file)
        }
        try{         
            dispatch(setLoading(true));
            // backend url chek karo same request postman mei
            const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "content-Type":"multipart/form-data"  // content type json nahi hoga kykui formdata use kar rahe hai
                },
                withCredentials:true 
            })
            if(res.data.success){ // agar res ke andar data aya hai to 
                navigate("/login") // login page pe bhej dunga signup hote hi
                toast.success(res.data.message)
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    //for protection like koi direct aise karke login na open kara paye http://localhost:5173/login  

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[]);

  return (
    <div>
      <Navbar/>

      <div className='flex items-center justify-center max-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Signup</h1>
                <div className='my-2'>
                    <Label className="my-1">Full Name</Label>
                    <Input
                        type="text"
                        value={input.fullname}
                        name="fullname"
                        onChange={changeEventHandler}
                        placeholder="onkar"
                    />
                </div>       
                <div className='my-2'>
                    <Label className="my-1">email</Label>
                    <Input
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        placeholder="onkar@gmail.com"
                    />
                </div>       
                <div className='my-2'>
                    <Label className="my-1">Phone Number</Label>
                    <Input
                        type="text"
                        value={input.phoneNumber}
                        name="phoneNumber"
                        onChange={changeEventHandler}
                        placeholder="3883002299"
                    />
                </div>       
                <div className='my-2'>
                    <Label className="my-1">Password</Label>
                    <Input
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={changeEventHandler}
                        placeholder="password"
                    />
                </div>  

                <div className='flex items-center justify-between '>
                    <RadioGroup className="flex gap-4 my-5 justify-center">
                        <div className="flex items-center gap-3">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role==='student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role==='recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                        
                    </RadioGroup>

                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>

                    
                </div>    
                {                                                                                           // false ke liye                                
                    loading?<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>please Wait</Button> :<Button type="submit" className="w-full my-4">Signup</Button> 
                }
                <span className='text-sm'>
                    Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
                </span>

        </form>
      </div>
    </div>
  )
}

export default Signup;















