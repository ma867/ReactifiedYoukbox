import './Lists.scss'
import { Table, Container, Button } from 'react-bootstrap'
import RecommendedSongListItem from './RecommendedSongListItem';
import LightButton from '../Buttons/LightButton';

export default function RecommendedSongList({
    foundSongs, foundSongsAudio, playlistId, addPlaylistSong, addSong, page, deleteSongFromSearch, user, deletePlaylistSong, deleteSpotifyPlaylistSong, songs
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
                                                        deletePlaylistSong={deletePlaylistSong}
                                                        deleteSpotifyPlaylistSong={deleteSpotifyPlaylistSong}
                                                        songs={songs}
                                                    /> :


                                                    <RecommendedSongListItem

                                                        foundSong={foundSong}
                                                        foundSongsAudio={foundSongsAudio}
                                                        addSong={addSong}
                                                        deleteSongFromSearch={deleteSongFromSearch}
                                                        playlistId={playlistId}
                                                        idx={idx}
                                                        user={user}
                                                    />








                                                : ""
                                        }
                                    </>
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