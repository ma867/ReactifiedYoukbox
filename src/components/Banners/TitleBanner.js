import { faTrashCan, faFileEdit, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'react-bootstrap'
export default function TitleBanner({ page, user, cover, title, description, listLength, FontAwesomeIcon, deletePlaylist, setShowUpdatePlaylistModal }) {
    return (
        <div className='title-banner  pt-5  p-5'>
            <div className='title-banner-contents mt-5 pt-3 pb-3 p-3 '>
                {
                    page !== 'search' && page !== 'playlists'
                        ? <>
                            <img className='p-2 title-banner-cover' src={cover} />
                            <div className='title-banner-description p-5'>
                                <h2 className='display-1 title'>{title}</h2>
                                <h6 className='pt-2'>{description}</h6>
                                <div className='title-banner-metadata icon-gap pt-1'>
                                    <div className='profile-icon' style={{ backgroundImage: `url(${user?.image})` }} />
                                    <p><small>{user?.name} &nbsp;&nbsp;•&nbsp;&nbsp;{listLength} songs</small></p>
                                    {
                                        page === 'playlist'
                                            ?
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    <FontAwesomeIcon icon={faEllipsis} className='icon light m-0' />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href=""
                                                        onClick={deletePlaylist}><FontAwesomeIcon
                                                            icon={faTrashCan}

                                                            className='icon'
                                                        />&nbsp;
                                                        Delete Playlist</Dropdown.Item>
                                                    <Dropdown.Item href=""
                                                        onClick={setShowUpdatePlaylistModal} >
                                                        <FontAwesomeIcon
                                                            icon={faFileEdit}

                                                            className='icon'
                                                        />&nbsp;
                                                        Edit Playlist</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            : ''
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <h2 className='display-1 title light'>{title}</h2><br />

                        </>

                }
            </div>
        </div>
    )
}