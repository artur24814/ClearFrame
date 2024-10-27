import React from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { Button } from "react-bootstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from '@tanstack/react-query'
import axios from '../../../conf/axiosConf.js'

export const RegisterForm = ({ onLogin }) => {
  const schema = yup.object().shape({
    firstName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    secondName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(6, 'Password should be at least 6 characters long').required('Required'),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('/api/auth/register', {
        ...data,
        permissions: 'BASE_USER',
      });
      return response.data
    },
    onSuccess: () => {
      onLogin()
    },
    onError: (error) => {
      console.error("Error during registration!", error)
    }
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="g-2 mb-4">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label={errors.firstName ? errors.firstName.message : 'First Name'}>
            <Form.Control
              type="text"
              placeholder="First name"
              {...register("firstName")}
              style={{ borderColor: errors.firstName ? 'red' : '#c0bdbd', color: errors.firstName ? 'red' : 'inherit' }}
            />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label={errors.secondName ? errors.secondName.message : "Second Name"}>
            <Form.Control
              type="text"
              placeholder="Second name"
              {...register("secondName")}
              style={{ borderColor: errors.secondName ? 'red' : '#c0bdbd', color: errors.secondName ? 'red' : 'inherit' }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mb-4">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label={errors.email ? errors.email.message : "Email"}>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              style={{ borderColor: errors.email ? 'red' : '#c0bdbd', color: errors.email ? 'red' : 'inherit' }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2 mb-4">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label={errors.password ? errors.password.message : "Password"}>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
              style={{ borderColor: errors.password ? 'red' : '#c0bdbd', color: errors.password ? 'red' : 'inherit' }}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className='w-100' type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Registering...' : 'Register'}
          </Button>
        </Col>
      </Row>
      {mutation.isError && <span>Error during registration. Please try again.</span>}
    </Form>
  )
}