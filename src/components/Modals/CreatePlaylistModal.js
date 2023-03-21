import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FormButton from "../Buttons/FormButton";

export default function CreatePlaylistModal({
    showCreatePlaylistModal,
    setShowCreatePlaylistModal,
    uploader,
    UploadButton,
    options,
    handleSubmit,
    handleChange,
    playlistFormData,
    setPlaylistArtwork,


}) {
    return (
        <>
            <Modal
                show={showCreatePlaylistModal}
                onHide={() => {
                    setShowCreatePlaylistModal(false);
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="title">New Playlist</Modal.Title>
                </Modal.Header>
                <Form
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="justify-content-center"
                >
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Playlist Title</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={playlistFormData.title}
                                placeholder="Playlist title goes here"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Description</Form.Label>
                            <Form.Control
                                className="login-input"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                value={playlistFormData.description}
                                placeholder="Playlist description goes here"
                            />
                        </Form.Group>

                        <UploadButton
                            uploader={uploader}
                            options={options}
                            onComplete={(files) =>
                                setPlaylistArtwork(files.map((x) => x.fileUrl).join("\n"))
                            }
                        >
                            {({ onClick }) => (
                                <Button className="form-button" onClick={onClick}>
                                    Upload Song Artwork
                                </Button>
                            )}
                        </UploadButton>
                    </Modal.Body>
                    <Modal.Footer>
                        <FormButton buttonHeader="Upload" />
                    </Modal.Footer>
                </Form>
            </Modal>
            Upload modal
        </>
    );
}
