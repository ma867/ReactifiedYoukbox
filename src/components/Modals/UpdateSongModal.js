import { Button, Modal, Form } from "react-bootstrap";
import FormButton from "../Buttons/FormButton";

export default function UpdateModal({

    setUpdatedArtwork,
    showUpdateSongModal,
    setShowUpdateSongModal,
    song,
    UploadButton,
    updateSong,
    handleChangeUpdateSong,
    uploader,
    options
}) {
    return (

        <Modal
            show={showUpdateSongModal}
            onHide={() => {
                setShowUpdateSongModal(false);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="title">Update Song</Modal.Title>
            </Modal.Header>
            <Form
                autoComplete="off"
                onSubmit={updateSong(song?._id, {
                    title: song.title,
                    artist: song.artist,
                    album: song.album,
                    audio: song.audio,
                })}
                className="justify-content-center"
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Title</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="title"
                            onChange={handleChangeUpdateSong}
                            defaultValue={song?.title}
                            placeholder="Title goes here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Artist(s)</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="artist"
                            onChange={handleChangeUpdateSong}
                            defaultValue={song?.artist}
                            placeholder="Artist(s) name goes here"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                        <Form.Label className="title">Album</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="album"
                            onChange={handleChangeUpdateSong}
                            defaultValue={song?.album}
                            placeholder="Album name goes here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                        <Form.Label className="title">MP3 URL</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="audio"
                            onChange={handleChangeUpdateSong}
                            defaultValue={song?.audio}
                            placeholder="URL for MP3 goes here"
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
                                Update Song Artwork
                            </Button>
                        )}
                    </UploadButton>
                </Modal.Body>
                <Modal.Footer>
                    <FormButton buttonHeader='Update Song' />
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
