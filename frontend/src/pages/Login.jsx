import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

   const [email,setEmail] = useState('');
   const [password ,setPassword] = useState('');
   const navigate = useNavigate();
   
   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login',{email,password})
    .then(result => {
        console.log(result)
        if(result.data === "Success")
        navigate('/home')
        else{
          alert('email or password incorrect')
       }

    })
    .catch(err => console.log(err))
   }


  return (
    <div className="text-center p-[50px]">
        <div className="">
            <h2 className='p-[10px] font-bold text-xl'>Login</h2>
         
            <form onSubmit={handleSubmit}>
                <div className="p-[10px]">
                    <label htmlFor="email">
                        <div className="">Email</div>
                    </label>
                    <input type="text" 
                           placeholder='Enter Email'
                           autoComplete='off'
                           name='email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="form-control rounded p-[10px]" />
                </div>
                <div className="p-[10px]">
                    <label htmlFor="email">
                    <div className="">Password</div>
                    </label>
                    <input type="password" 
                           placeholder='Enter Password'
                           autoComplete='off'
                           name='email'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="form-control rounded p-[10px]" />
                </div>
                <button className="bg-purple-600 p-[10px] rounded" type='submit'>Login</button>
            </form>

        </div>
    </div>
  )
}

export default Login
