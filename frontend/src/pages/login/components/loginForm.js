import React from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import axios from '../../../conf/axiosConf.js'
import { useAuth } from '../../../context/autContext.js'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Password should be at least 6 characters long').required('Required'),
})

export const LoginForm = ({ redirectPath }) => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/login', data)
      console.log(response.data)
      login(response.data)
      navigate(redirectPath || '/')
    } catch (error) {
      console.error("Error during login!", error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          {...register("email")}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email ? errors.email.message : ''}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          {...register("password")}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password ? errors.password.message : ''}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}