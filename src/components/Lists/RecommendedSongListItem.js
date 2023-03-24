import { faHeartCirclePlus, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons'
import IconButton from '../Buttons/IconButton'
import './Lists.scss'
export default function RecommendedSongListItem({ user, page, idx, foundSong, foundSongsAudio, addSong, addPlaylistSong, deleteSongFromSearch, playlistId, FontAwesomeIcon, }) {

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

                    <tr key={spotifyId}>

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
                                        artistsNames.push(artist.name)

                                        if (idx !== artists.length - 1)
                                            return (
                                                <>
                                                    {artist.name + ", "}
                                                </>
                                            )
                                        else {
                                            return (
                                                <>
                                                    {artist.name}
                                                </>

                                            )
                                        }
                                    })}
                                </h6>
                            </div>
                        </td>
                        <td className="main-album-title">{album}</td>
                        <td className="">
                            {
                                page === 'playlist' ?


                                    <IconButton buttonHeader={<FontAwesomeIcon icon={faHeartCirclePlus} className='icon' />} buttonFunction={() => { addPlaylistSong({ title, album, artist: artistsNames, artwork, audio, spotify: true, spotifyId: spotifyId }, playlistId) }} />
                                    :
                                    user?.spotifyIds.includes(spotifyId) ?

                                        <IconButton buttonHeader={<FontAwesomeIcon icon={faHeartCircleMinus} className='icon' />} buttonFunction={() => { deleteSongFromSearch(spotifyId) }} />

                                        :

                                        <IconButton buttonHeader={<><FontAwesomeIcon icon={faHeartCirclePlus} className='icon' /></>} buttonFunction={() => { addSong({ title, album, artist: artistsNames, artwork, audio, spotify: true, spotifyId: spotifyId }) }} />

                            }


                        </td>
                    </tr>
                    :
                    ""
            }
        </>
    )
}