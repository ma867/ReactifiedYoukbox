import './Lists.scss'
import { Table, Container } from 'react-bootstrap'
import RecommendedSongListItem from './RecommendedSongListItem';
export default function RecommendedSongList({
    foundSongs, foundSongsAudio, playlistId, addPlaylistSong, addSong, page, deleteSongFromSearch, user, FontAwesomeIcon
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
                                        <>
                                            {
                                                foundSong ?

                                                    page === 'playlist' ?
                                                        <RecommendedSongListItem

                                                            foundSong={foundSong}
                                                            foundSongsAudio={foundSongsAudio}
                                                            addPlaylistSong={addPlaylistSong}
                                                            deleteSongFromSearch={deleteSongFromSearch}
                                                            playlistId={playlistId}
                                                            idx={idx}
                                                            user={user}
                                                            page='playlist'
                                                            FontAwesomeIcon={FontAwesomeIcon}

                                                        /> :

                                                        <RecommendedSongListItem

                                                            foundSong={foundSong}
                                                            foundSongsAudio={foundSongsAudio}
                                                            addSong={addSong}
                                                            deleteSongFromSearch={deleteSongFromSearch}
                                                            playlistId={playlistId}
                                                            idx={idx}
                                                            user={user}
                                                            FontAwesomeIcon={FontAwesomeIcon}
                                                        />

                                                    : ""
                                            }
                                        </>
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