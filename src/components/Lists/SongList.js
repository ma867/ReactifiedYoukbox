import './Lists.scss'
import { Table, Container } from 'react-bootstrap'
import SongListItem from './SongListItem';
export default function SongList({
    songs, deleteSong,
    setShowUpdateSongModal,
    setSong,
    setUpdatedArtwork, FontAwesomeIcon, page, playlistId
}) {

    return (
        <>

            <Container
                className="mt-5  mb-5 overflow-auto song-list-container"
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
                                    key={idx}
                                    idx={idx}
                                    song={song}
                                    setShowUpdateSongModal={setShowUpdateSongModal}
                                    setSong={setSong}
                                    deleteSong={deleteSong}
                                    setUpdatedArtwork={setUpdatedArtwork}
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    page={page}
                                    playlistId={playlistId} />

                            );
                        })}
                    </tbody>
                </Table>
            </Container>



        </>
    )
}