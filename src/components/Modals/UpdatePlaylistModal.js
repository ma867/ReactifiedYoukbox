import { Button, Modal, Form } from "react-bootstrap";
import FormButton from "../Buttons/FormButton";

export default function UpdatePlaylistModal({

    showUpdatePlaylistModal,
    setShowUpdatePlaylistModal,
    playlist,
    UploadButton,
    updatePlaylist,
    handleChangeUpdatePlaylist,
    uploader,
    options,
    setUpdatedArtwork
}) {
    return (

        <Modal
            show={showUpdatePlaylistModal}
            onHide={() => {
                setShowUpdatePlaylistModal(false);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="title">Update Playlist</Modal.Title>
            </Modal.Header>
            <Form
                autoComplete="off"
                onSubmit={() => {
                    updatePlaylist(playlist?._id, {
                        title: playlist.title,
                        description: playlist.description,
                    })
                }}
                className="justify-content-center"
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Title</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="title"
                            onChange={handleChangeUpdatePlaylist}
                            defaultValue={playlist?.title}
                            placeholder="Playlist title goes here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Description</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="description"
                            onChange={handleChangeUpdatePlaylist}
                            defaultValue={playlist?.description}
                            placeholder="Description goes here"
                        />
                    </Form.Group>

                    <UploadButton
                        uploader={uploader}
                        options={options}
                        onComplete={(files) =>
                            setUpdatedArtwork(files.map((x) => x.fileUrl).join("\n"))
                        }
                    >
                        {({ onClick }) => (
                            <Button className="form-button" onClick={onClick}>
                                Upload Playlist Artwork
                            </Button>
                        )}
                    </UploadButton>
                </Modal.Body>
                <Modal.Footer>
                    <FormButton buttonHeader='Update Playlist' />
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
