
import { useState } from 'react'
import Login from '../../components/pages/Auth/Login'
import SignUp from '../../components/pages/Auth/SignUp'

export default function Auth({ setUser, navigate, uploader, UploadButton, options }) {
    const [visible, setVisible] = useState('login')

    return (
        <>

            {
                visible === 'login'
                    ? (
                        <Login setUser={setUser} setVisible={setVisible} navigate={navigate} />

                    )
                    : (

                        <SignUp uploader={uploader} UploadButton={UploadButton} options={options} setUser={setUser} setVisible={setVisible} navigate={navigate} />
                    )
            }

        </>
    )
}
