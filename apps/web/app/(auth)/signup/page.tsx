"use client"
import axios from 'axios'
import React, { useState } from 'react'

interface InputTypes {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const page = () => {

  const [signUpDetails, setSignUpDetails] = useState<InputTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleFistName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails(prev => ({...prev, firstName: e.target.value}))
  }
  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails(prev => ({...prev, lastName: e.target.value}))
  }
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails(prev => ({...prev, email: e.target.value}))
  }
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDetails(prev => ({...prev, password: e.target.value}))
  }
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/signup", signUpDetails);
      alert(JSON.stringify(signUpDetails))
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <section>
      <dl>
        <dt>
          first name
        </dt>
        <dd>
          <input type="text" placeholder='first name' onChange={handleFistName} />
        </dd>
        <dt>
          last name
        </dt>
        <dd>
          <input type="text" placeholder='last name' onChange={handleLastName} />
        </dd>
        <dt>
          email
        </dt>
        <dd>
          <input type="email" placeholder='email' onChange={handleEmail} />
        </dd>
        <dt>
          password
        </dt>
        <dd>
          <input type="password" placeholder='password' onChange={handlePassword} />
        </dd>
      </dl>
      <button onClick={handleSubmit}>sign up</button>
    </section>
  )
}

export default page