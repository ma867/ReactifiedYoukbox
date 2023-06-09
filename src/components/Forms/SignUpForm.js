import { Form, Button } from 'react-bootstrap'
import FormButton from '../Buttons/FormButton'
export default function SignUpForm({ uploader, UploadButton, options, handleSubmit, handleChange, setVisible, formData, setImage }) {
    return (
        <Form autoComplete='off' onSubmit={handleSubmit} style={{ width: '500px' }}>
            <h1 className='pb-3'>Submit</h1>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Name</Form.Label>
                <Form.Control className='login-input' type='text' name='name' onChange={handleChange} value={formData.name} placeholder='Name' required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control className='login-input' type='email' name='email' onChange={handleChange} value={formData.email} placeholder='Email' required />
            </Form.Group>

            <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='login-input' type='password' name='password' onChange={handleChange} value={formData.password} placeholder='Password' required />
            </Form.Group>
            <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className='login-input' type='password' name='confirm' onChange={handleChange} value={formData.confirm} placeholder='Re-enter Password' required />
            </Form.Group>

            <UploadButton uploader={uploader} options={options} onComplete={(files) => setImage(files.map((x) => x.fileUrl).join('\n'))}>
                {({ onClick }) => (<Button className='form-button' onClick={onClick}>Upload a Profile Photo</Button>)}
            </UploadButton>
            <br />
            <FormButton buttonHeader='Submit' />
            <br />
            <div className='text-center'>
                <a onClick={() => { setVisible('login') }} className='small'>Already have an account? Log in!</a>
            </div>
        </Form>

    )
}