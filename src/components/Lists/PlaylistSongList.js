import './Lists.scss'
import { Table, Container } from 'react-bootstrap'
import PlaylistSongListItem from './PlaylistSongListItem';
export default function PlaylistSongList({
    foundSongs, foundSongsAudio, playlistId, addPlaylistSong, FontAwesomeIcon
}) {

    return (
        <>
            <Container
                className="mt-5  mb-5 overflow-auto playlist-song-container"

            >
                <Table responsive="xl">
                    <tbody>

                        {
                            foundSongs && foundSongsAudio

                                ? foundSongs.map((foundSong, idx) => {

                                    return (
                                        <PlaylistSongListItem

                                            foundSong={foundSong}
                                            foundSongsAudio={foundSongsAudio}
                                            addPlaylistSong={addPlaylistSong}
                                            playlistId={playlistId}
                                            idx={idx}
                                            FontAwesomeIcon={FontAwesomeIcon}
                                        />
                                    )
                                })

                                :

                                'No songs found'
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}