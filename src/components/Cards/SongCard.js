
import './Cards.scss'
import Marquee from "react-fast-marquee"

import { faEllipsisVertical, faHeartCirclePlus, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { Col, Card, Dropdown } from 'react-bootstrap'
export default function SongCard({ page, FontAwesomeIcon, foundSong, user, deleteSongFromSearch, foundSongsAudio, addSong, idx }) {

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

                    <Col xs={6} md={3} lg={3} className='mb-3 search-cards' key={spotifyId} >
                        <Card className='shadow-sm border-0 rounded-0' style={{ width: '100%' }}>

                            <div className='album-wrapper'>
                                <Card.Img variant='top' className='rounded-0' src={artwork} />
                                <div className='audio-wrapper'>
                                    <audio src={audio} controls />
                                </div>
                            </div>
                            <Card.Body className='search-card-body-custom'>
                                <div className='search-card-text-custom' >
                                    <Card.Title className='search-card-title-custom '>
                                        {
                                            title?.length + album?.length > 20 ?
                                                <Marquee pauseOnHover={true} gradientWidth='5px' speed='20' className="title">
                                                    {title} &nbsp;•&nbsp;{album}&nbsp;•&nbsp;
                                                </Marquee> :
                                                <p className="title mb-1">
                                                    {title} &nbsp;•&nbsp;{album}&nbsp;
                                                </p>
                                        }
                                    </Card.Title>
                                    <Card.Text className='search-card-info-custom ' >
                                        {
                                            artists.length > 1 || artists[0].length > 20 ?
                                                <Marquee pauseOnHover={true} gradientWidth='5px' speed='20'>
                                                    <p>
                                                        {
                                                            artists.map((artist, idx) => {
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
                                                            })
                                                        }

                                                    </p>

                                                </Marquee>
                                                :
                                                <p>
                                                    {

                                                        artists.map((artist, idx) => {
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
                                                        })

                                                    }

                                                </p>
                                        }
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
                                            {
                                                user?.spotifyIds.includes(spotifyId) ?


                                                    <Dropdown.Item
                                                        href=""
                                                        onClick={() => { deleteSongFromSearch(spotifyId) }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faHeartCircleMinus}
                                                            className="icon"
                                                        />
                                                        &nbsp;Remove Song from Library
                                                    </Dropdown.Item>

                                                    :
                                                    <Dropdown.Item
                                                        href=""
                                                        onClick={() => { addSong({ title, album, artist: artistsNames, artwork, audio, spotify: true, spotifyId: spotifyId }) }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faHeartCirclePlus}
                                                            className="icon"
                                                        />
                                                        &nbsp;Add Song to Library
                                                    </Dropdown.Item>

                                            }
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