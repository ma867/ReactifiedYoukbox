import './Lists.scss'
import { Table, Container, Button } from 'react-bootstrap'
import PlaylistSongListItem from './PlaylistSongListItem';
export default function PlaylistSongList({
    foundSongs, foundSongsAudio, playlistId, addPlaylistSong
}) {

    return (
        <>

            <Container
                className="mt-5  mb-5 overflow-auto playlist-song-container"

            >
                <Table responsive="xl">

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
                                    />
                                )
                            })

                            :

                            'No songs found'
                    }
                </Table>
            </Container>





        </>
    )
}