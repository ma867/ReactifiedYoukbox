import { Dropdown } from 'react-bootstrap'
import { faTrashCan, faFileEdit, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import './Lists.scss'
export default function SongListItem({ idx, song, deleteSong,
    setShowUpdateSongModal,
    setSong,
    setUpdatedArtwork, FontAwesomeIcon, page, playlistId }) {

    return (
        <>
            {
                song ?
                    (<tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                            <div className="album-wrapper">
                                <img
                                    className="rounded-0"
                                    src={song.artwork}
                                    width="70px"
                                    height="70px"
                                />
                                <div className="audio-wrapper">
                                    <audio src={song?.audio} controls />
                                </div>
                            </div>
                        </td>
                        <td className="song-title">
                            <div className="flex vertical text-left">
                                <h5 className="main-song-title">{song.title}</h5>
                                <h6 className="main-artist-title">
                                    {song?.artist?.join(" • ")}
                                </h6>
                            </div>
                        </td>
                        <td className="main-album-title">{song.album}</td>
                        <td className="main-date-title">
                            {song?.createdAt?.slice(0, 10)}
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <FontAwesomeIcon
                                        icon={faEllipsisVertical}
                                        className="icon"
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                    {
                                        page === 'playlist' ?
                                            <Dropdown.Item
                                                href=""
                                                onClick={() => {
                                                    console.log("HI")
                                                    deleteSong(playlistId, song._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className="icon"
                                                />
                                                &nbsp; Remove from Playlist
                                            </Dropdown.Item>

                                            :

                                            <Dropdown.Item
                                                href=""
                                                onClick={() => {
                                                    deleteSong(song._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className="icon"
                                                />
                                                &nbsp; Remove from Library
                                            </Dropdown.Item>

                                    }






                                    {!song?.spotify ? (
                                        <Dropdown.Item
                                            href=""
                                            onClick={() => {
                                                setShowUpdateSongModal(true)
                                                setSong(song)
                                                setUpdatedArtwork(song.artwork)
                                            }}

                                        >
                                            <FontAwesomeIcon
                                                icon={faFileEdit}
                                                className="icon"
                                            />
                                            &nbsp; Edit Song
                                        </Dropdown.Item>
                                    ) : (
                                        ""
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>) :
                    ""
            }
        </>
    )
}