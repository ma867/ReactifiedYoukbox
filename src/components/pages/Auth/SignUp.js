
import { useState } from 'react'
import { signUp } from '../../../utilities/users-service'
import { Container, Col, Row } from 'react-bootstrap'
import SignUpForm from '../../Forms/SignUpForm'
import AuthBanner from '../../Banners/AuthBanner'
export default function SignUp({ uploader, UploadButton, options, setUser, setVisible, navigate }) {
    const [image, setImage] = useState('https://i.imgur.com/KsFQszwb.png')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''

    })
    const [error, setError] = useState('')

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
        setError('')
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const formDataCopy = { ...formData, image: image }
            delete formDataCopy.confirm
            const user = await signUp(formDataCopy)
            setUser(user)
            navigate('/')
        } catch (error) {
            setError('Sign up failed. Username and/or email address may already be in use. ')
        }
    }

    return (
        <Container fluid style={{ backgroundColor: 'yellow' }} className='w-100 vh-100'>
            <Row>
                <AuthBanner title='Welcome!' subtitle="We're happy to have you! 😊" />


                <Col lg={6} className='full-height flex justify-content-center align-items-center light-background'>

                    <SignUpForm uploader={uploader} UploadButton={UploadButton} options={options} handleChange={handleChange} handleSubmit={handleSubmit} setVisible={setVisible} formData={formData} setImage={setImage} />


                </Col>
            </Row>
        </Container>
    )

}