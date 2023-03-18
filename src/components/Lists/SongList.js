import './Lists.scss'
import { Table, Container } from 'react-bootstrap'
import SongListItem from './SongListItem';
export default function SongList({
    songs, deleteSong,
    setShowUpdateSongModal,
    setSong,
    setUpdatedArtwork, FontAwesomeIcon
}) {

    return (
        <>

            <Container
                className="mt-5  mb-5 overflow-auto"
                style={{ width: "100%", height: "500px" }}
            >
                <Table responsive="xl">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ARTWORK</th>
                            <th>TITLE</th>
                            <th>ALBUM</th>
                            <th>DATE ADDED</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {songs?.map((song, idx) => {
                            return (
                                <SongListItem
                                    idx={idx}
                                    song={song}
                                    setShowUpdateSongModal={setShowUpdateSongModal}
                                    setSong={setSong}
                                    deleteSong={deleteSong}
                                    setUpdatedArtwork={setUpdatedArtwork}
                                    FontAwesomeIcon={FontAwesomeIcon} />

                            );
                        })}
                    </tbody>
                </Table>
            </Container>



        </>
    )
}