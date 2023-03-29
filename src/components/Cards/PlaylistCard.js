
import './Cards.scss'
import Marquee from "react-fast-marquee"

import { faEllipsisVertical, faPlusCircle, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { Col, Card, Dropdown } from 'react-bootstrap'
export default function PlaylistCard({ page, FontAwesomeIcon, playlist, navigate, deletePlaylist, idx }) {

    const title = playlist?.title
    const description = playlist?.description
    const id = playlist?._id
    const artwork = playlist?.artwork
    const length = playlist?.songs?.length

    return (
        <>
            {
                playlist ?
                    <Col xs={6} md={3} lg={3} className='mb-3 search-cards' key={id} >
                        <Card className='shadow-sm border-0 rounded-0' style={{ width: '100%' }}>

                            <div className='album-wrapper'>
                                <Card.Img variant='top' className='rounded-0' src={artwork} />
                            </div>
                            <Card.Body className='search-card-body-custom'>
                                <div className='search-card-text-custom' >
                                    <Card.Title className='search-card-title-custom title mb-0 pb-0 card-playlist-title' onClick={() => { navigate(`/playlist/${id}`) }}>

                                        {
                                            title?.length > 20 ?
                                                <Marquee pauseOnHover={true} gradientWidth='5px' speed='20' className="title">
                                                    {title}
                                                </Marquee> :
                                                <>
                                                    {title}
                                                </>
                                        }
                                    </Card.Title>
                                    <Card.Text className='search-card-info-custom playlist-description pb-0 mb-0' >

                                        {
                                            description?.length > 20 ?
                                                <Marquee pauseOnHover={true} gradientWidth='5px' speed='20' >
                                                    <small> {description}</small>

                                                </Marquee> :
                                                <>
                                                    {description}
                                                </>
                                        }

                                    </Card.Text>
                                    <Card.Text className='search-card-info-custom ' >

                                        {length} songs

                                    </Card.Text>
                                </div>
                                <div className='search-card-menu'>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic-search">
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                                className="icon"
                                            />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                href=""
                                                onClick={() => { deletePlaylist(id) }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faHeartCircleMinus}
                                                    className="icon"
                                                />
                                                &nbsp; Remove from Library
                                            </Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                    :
                    ''
            }
        </>
    )




}