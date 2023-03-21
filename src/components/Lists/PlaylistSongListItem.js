import { Button } from 'react-bootstrap'
import LightButton from '../Buttons/LightButton'
import './Lists.scss'
export default function PlaylistSongListItem({ idx, foundSong, foundSongsAudio, addPlaylistSong, playlistId, FontAwesomeIcon }) {



    const title = foundSong.data.name
    const spotifyId = foundSong.data.id
    const artists = foundSong.data.artists.items
    const artistsNames = []
    const album = foundSong.data.albumOfTrack.name
    const artwork = foundSong.data.albumOfTrack.coverArt.sources[0].url
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
                                    {artists.map((artist, idx) => {
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
                                    })}
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
}