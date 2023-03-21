import './Lists.scss'
import { Table, Container, Button } from 'react-bootstrap'
import PlaylistSongListItem from './PlaylistSongListItem';
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

                                                <tr key={idx}>

                                                    <td>
                                                        <div className="album-wrapper">
                                                            <img
                                                                className="rounded-0"
                                                                src={artwork}
                                                                width="70px"
                                                                height="70px"
                                                            />
                                                            <div className="audio-wrapper">
                                                                <audio src={audio} controls />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="song-title">
                                                        <div className="flex vertical text-left">
                                                            <h5 className="main-song-title">{title}</h5>
                                                            <h6 className="main-artist-title">
                                                                {/* {artists.map((artist, idx) => {
                                                                    artistsNames.push(artist.profile.name)

                                                                    if (idx !== artists.length - 1)
                                                                        return (
                                                                            <>
                                                                                {artist.profile.name + ", "}
                                                                            </>
                                                                        )
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {artist.profile.name}
                                                                            </>

                                                                        )
                                                                    }
                                                                })} */}
                                                            </h6>
                                                        </div>
                                                    </td>
                                                    <td className="main-album-title">{album}</td>
                                                    <td className="">
                                                        <LightButton buttonHeader='Add to Playlist' buttonFunction={() => { addPlaylistSong({ title, album, artist: artistsNames, artwork, audio, spotify: true, spotifyId: spotifyId }, playlistId) }} />
                                                        {/* <Button onClick={() => { addPlaylistSong({ title, album, artist: artistsNames, artwork, audio, spotify: true, spotifyId: spotifyId }, playlistId) }}>ADD SONG</Button> */}
                                                    </td>
                                                </tr> :
                                                ""
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