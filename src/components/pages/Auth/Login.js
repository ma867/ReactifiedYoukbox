
import * as userService from '../../../utilities/users-service'
import { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import LoginForm from '../../Forms/LoginForm'
import AuthBanner from '../../Banners/AuthBanner'
export default function Login({ setUser, setVisible, navigate }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
        setError('')
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const user = await userService.login(credentials)
            setUser(user)
            navigate('/')
        } catch (error) {
            setError(error.messsage)
        }
    }
    return (
        <>

            <Container fluid className='w-100 vh-100'>

                <Row >
                    <AuthBanner title='Oh, hello! 👋' subtitle='We missed you!' />

                    <Col lg={6} className='full-height flex justify-content-center align-items-center light-background'>

                        <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} setVisible={setVisible} credentials={credentials} />
                    </Col>
                </Row>
            </Container>

        </>
    )

}