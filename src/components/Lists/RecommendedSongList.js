import './Lists.scss'
import { Table, Container, Button } from 'react-bootstrap'
import RecommendedSongListItem from './RecommendedSongListItem';
import LightButton from '../Buttons/LightButton';

export default function RecommendedSongList({
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


                                const title = foundSong.track.name
                                const spotifyId = foundSong.track.id
                                const artists = foundSong.track.artists
                                const artistsNames = []
                                const album = foundSong.track.album.name
                                const artwork = foundSong.track.album.images[1].url
                                const audio = foundSongsAudio[idx]?.preview_url


                                return (
                                    <>
                                        {
                                            foundSong ?

                                                <RecommendedSongListItem

                                                    foundSong={foundSong}
                                                    foundSongsAudio={foundSongsAudio}
                                                    addPlaylistSong={addPlaylistSong}
                                                    playlistId={playlistId}
                                                    idx={idx}
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