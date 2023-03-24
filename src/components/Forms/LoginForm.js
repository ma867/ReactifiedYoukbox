import { Form } from 'react-bootstrap'
import FormButton from '../Buttons/FormButton'

export default function LoginForm({ handleSubmit, handleChange, setVisible, credentials }) {
    return (
        <Form autoComplete='off' onSubmit={handleSubmit} style={{ width: '500px' }}>
            <h1 className='pb-3'>Login</h1>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className='login-input' type='email' name='email' onChange={handleChange} value={credentials.email} placeholder='Email' />
            </Form.Group>
            <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='login-input' type='password' name='password' onChange={handleChange} value={credentials.password} placeholder='Password' />
            </Form.Group>
            <FormButton buttonHeader='Login' />
            <br />
            <div className='text-center'>
                <a onClick={() => { setVisible('signup') }} className='small text-center'>Don't have an account? Sign up!</a>
            </div>
        </Form>
    )
}