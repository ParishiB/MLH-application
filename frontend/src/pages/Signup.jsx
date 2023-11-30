import React, { useState } from 'react'
import { Link  , useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {

    const [name , setName ] = useState('');
    const [email , setEmail] = useState('');
    const [password ,  setPassword] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register',{name,email,password})
        .then(result => {console.log(result)
         navigate('/login')
        })
        
         .catch(err => console.log(err))
    }

  
    return (
    <div className="text-center p-[50px]">
        <div className="">
            <h2 className='p-[5px] font-bold text-xl'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-[10px]">
                    <label htmlFor="email">
                    <div className="">Name</div>
                    </label>
                    <input type="text" 
                           placeholder='Enter Name'
                           autoComplete='off'
                           name='email'
                           className="form-control rounded p-[10px]"
                           onChange={(e) => setName(e.target.value)}
                           />
                </div>
                <div className="p-[10px]">
                    <label htmlFor="email">
                    <div className="">Email</div>
                    </label>
                    <input type="text" 
                           placeholder='Enter Email'
                           autoComplete='off'
                           name='email'
                           className="form-control rounded p-[10px]"
                           onChange={(e) => setEmail(e.target.value)}
                            />
                </div>
                <div className="p-[10px]">
                    <label htmlFor="email">
                    <div className=" ">Password</div>
                    </label>
                    <input type="password" 
                           placeholder='Enter Password'
                           autoComplete='off'
                           name='email'
                           className="form-control rounded p-[10px]"
                           onChange={(e) => setPassword(e.target.value)}
                            />
                </div>
                <button className="bg-purple-600 p-[10px] rounded" type='submit'>Register</button>
                </form>
                <p className='p-[20px] font-bold'>Already have an account?</p>
                <button className="bg-purple-600 p-[10px] rounded"><Link to='/login'>Login</Link></button>
        </div>
    </div>
  )
}

export default Signup

