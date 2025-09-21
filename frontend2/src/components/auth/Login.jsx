
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
import { setLoading, setUser } from '../../redux/authSlice'
import store from '../../redux/store'
import { Loader2 } from 'lucide-react'

const Login = () => {

    const [input,setInput]=useState({
            email:"",
            password:"",
            role:""
        });
    
    const {loading,user} =useSelector(store=>store.auth) // loding ko lekke aya . lane ke liye useselctor use karte hai
    const navigate=useNavigate();
    const dispatch=useDispatch();  // ye use kar raha hu loading dikhane liye matlab jaise hi user loin button dabayega usko loading dikahyega jabtak next page tak nahi jata

    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
            // ...initial input to ayega hi //event.target.name se uski value change karni hai
    }

    const submitHandler=async(e)=>{
        e.preventDefault();  
        
        // formadata nahi chahaiye yaha par kykii file vagera nahi bhej raha hu
        
        
        try{                       
            dispatch(setLoading(true)); 

            // backend url chek karo same request postman mei
            const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
                headers:{
                    "content-Type":"application/json"  
                },
                withCredentials:true 
            })
            if(res.data.success){ // agar res ke andar data aya hai to 
                dispatch(setUser(res.data.user));
                navigate("/") // login hote hi home page pe bhej dunga
                toast.success(res.data.message)
            }
        }
        catch(error){
            console.log(error);
            
        }
        finally{
            dispatch(setLoading(false));
            // finally chalega hi chalega uper me se koi bhi ek chala to agar succeffully login hua to loading band ho jayega 
            // nahi to error aaya to bhi band ho jayega
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
        <form onSubmit={submitHandler}  className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Login</h1>
                     
                <div className='my-3'>
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

                    
                </div>
                {                                                                                           // false ke liye                                
                    loading?<Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>please Wait</Button> :<Button type="submit" className="w-full my-4">Login</Button> 
                }
                
                <span className='text-sm'>
                    Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
                </span>

        </form>
      </div>
    </div>
  )
}

export default Login;
