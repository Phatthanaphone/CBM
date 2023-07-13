import React, { useState, useEffect } from "react";
import LoginService from '../services/LoginService'
import {useNavigate, useLocation,Redirect} from 'react-router-dom'
import {useAuth} from './auth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth() 
  let initData = {
    email: '',
    password: '',
  };

  const [data, setData] = useState({ ...initData });
  const [user, setUser] = useState('')
  const handleChange = (element) => {
    let key = element.target.id;
    let value = element.target.value;
    data[key] = value;
    setData({ ...data });
  };

  // const redirectPath = location.state?.path || '/'
  const handleSubmit = async (event) => {
    
    event.preventDefault();
     if (data.email === "" || data.password ==="") {
       return alert("please fill in the blank")
     }
     const headers = {
      'Content-Type': 'application/json'
    }
     let result = []

     result = await LoginService.post(data)
     .then(response => {
        if(response.data.status == 'ok'){
        
         localStorage.setItem('token',response.data.token)
         alert('Login Success')
         auth.login(response.data.token)
        window.location.replace('/', {replace: true })
      }else {
          console.log('error')
          alert('No user found')
      }
     })
     .catch((error) => {
       console.log(error)
       alert('No user found')
     })
  }

  useEffect( () => {
    //  const fetchData = async () =>{
    //   const token = localStorage.getItem('token')
    //   setUser(token)
    //  }

    //  fetchData();
     
  },[])

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             
              <button
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
               
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  type="email"
                  autocomplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={data.value}
                  onChange={handleChange}
                  type="password"
                  autocomplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  for="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
