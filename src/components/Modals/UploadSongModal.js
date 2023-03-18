import { Button, Modal, Form } from 'react-bootstrap'
import FormButton from '../Buttons/FormButton'
export default function UploadSongModal({ setShowUploadSongModal, uploader,
    UploadButton, options,
    handleSubmit, handleChange, songFormData, setArtwork }) {

    return (
        <>

            <Modal
                show={setShowUploadSongModal} onHide={() => { setShowUploadSongModal(false) }} size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Upload Song</Modal.Title>
                </Modal.Header>
                <Form autoComplete='off' onSubmit={handleSubmit} className='justify-content-center'>

                    <Modal.Body>

                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label className='title'>Song Title</Form.Label>
                            <Form.Control className='login-input' type='text' name='title' onChange={handleChange} value={songFormData.title} placeholder='Song title goes here' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label className='title'>Artist(s)</Form.Label>
                            <Form.Control className='login-input' type='text' name='artist' onChange={handleChange} value={songFormData.artist} placeholder='Artist(s) name goes here' />
                        </Form.Group>

                        <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                            <Form.Label className='title'>Album</Form.Label>
                            <Form.Control className='login-input' type='text' name='album' onChange={handleChange} value={songFormData.album} placeholder='Album name goes here' />
                        </Form.Group>
                        <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                            <Form.Label className='title'>MP3 URL</Form.Label>
                            <Form.Control className='login-input' type='text' name='audio' onChange={handleChange} value={songFormData.audio} placeholder='URL for MP3 goes here' />
                        </Form.Group>

                        <UploadButton uploader={uploader} options={options} onComplete={(files) => setArtwork(files.map((x) => x.fileUrl).join('\n'))}>
                            {({ onClick }) => (<Button className='form-button' onClick={onClick}>Upload Song Artwork</Button>)}
                        </UploadButton>
                    </Modal.Body>
                    <Modal.Footer>

                        <FormButton buttonHeader='Upload' />
                    </Modal.Footer>
                </Form>
            </Modal>

            Upload modal





        </>
    )
}