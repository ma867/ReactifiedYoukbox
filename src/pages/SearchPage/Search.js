import Marquee from "react-fast-marquee"
import NavBar from "../../components/NavBar/NavBar"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { faEllipsisVertical, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { Col, Row, Container, Button, Card, Dropdown } from 'react-bootstrap'
import TitleBanner from "../../components/Banners/TitleBanner"
export default function Search({ page,

    user,
    navigate,
    searchBarData,
    setSearchBarData,
    FontAwesomeIcon,
}) {
    const params = useParams()
    const query = params.data

    const [foundSongs, setFoundSongs] = useState([])
    const [foundSongsAudio, setFoundSongsAudio] = useState([])
    const [foundAlbums, setFoundAlbums] = useState([])
    const [ids, setIds] = useState('')
    const [artwork, setArtwork] = useState('https://i.imgur.com/0FUT9eJ.png')

    const addSong = async (songData) => {
        try {
            const response = await fetch(`/api/songs/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...songData })
            })
            const data = await response.json()
        } catch (error) {
            console.error(error)
        }
    }
    const findSong = async () => {
        try {
            const response = await fetch(
                `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=20&numberOfTopResults=5`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '721e6a3327mshe34359d3563d7e7p1f7ccejsn1d1230e5e489',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            }

            )
            const data = await response.json()
            setFoundSongs(data.tracks.items)
            setFoundAlbums(data.albums.items)
            let ids = ''
            data.tracks.items.map((foundSong, idx) => {
                if (idx === data.tracks.items.length - 1) {
                    ids += foundSong.data.id
                } else {
                    ids += foundSong.data.id + ','
                }
            })
            setIds(ids)
            findSongAudio(ids)
        } catch (error) {
            console.error(error)
        }
    }

    const findSongAudio = async (ids) => {
        try {
            const response = await fetch(
                `https://spotify23.p.rapidapi.com/tracks/?ids=${ids}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '721e6a3327mshe34359d3563d7e7p1f7ccejsn1d1230e5e489',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            }

            )
            const data = await response.json()
            setFoundSongsAudio(data.tracks)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        findSong()
    }, [query])
    return (<>
        <NavBar page={page}
            user={user}
            navigate={navigate}
            searchBarData={searchBarData}
            setSearchBarData={setSearchBarData}
            FontAwesomeIcon={FontAwesomeIcon}
        />


        <TitleBanner
            page="search"
            user={user}

            title="Search"

            FontAwesomeIcon={FontAwesomeIcon}
        />




        <Container className='mb-3 mt-3 '>
            <Row className='justify-content-md-center'>
                {
                    foundSongs && foundSongsAudio

                        ? foundSongs.map((foundSong, idx) => {
                            const title = foundSong.data.name
                            const artists = foundSong.data.artists.items
                            const artistsNames = []
                            const album = foundSong.data.albumOfTrack.name
                            const artwork = foundSong.data.albumOfTrack.coverArt.sources[0].url
                            const audio = foundSongsAudio[idx]?.preview_url
                            return (
                                <Col xs={6} md={3} lg={3} className='mb-3' key={idx}>
                                    <Card className='shadow-sm border-0 rounded-0' style={{ width: '100%' }}>

                                        <div className='album-wrapper'>
                                            <Card.Img variant='top' className='rounded-0' src={artwork} />
                                            <div className='audio-wrapper'>
                                                <audio src={audio} controls />
                                            </div>
                                        </div>
                                        <Card.Body className='card-body-custom'>
                                            <div className="flex horizontal justify-content-center align-items-top">
                                                <div className='card-text-custom' style={{ width: '97%' }}>
                                                    <Card.Title className='card-title-custom'>
                                                        <Marquee pauseOnHover={true} gradientWidth='5px' speed='20'>
                                                            {title} &nbsp;•&nbsp;{album}&nbsp;
                                                        </Marquee>
                                                    </Card.Title>



                                                    <Card.Text  >
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

                                                    </Card.Text>
                                                </div>



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
                                                            onClick={() => { addSong({ title, album, artist: artistsNames, artwork, audio, spotify: true }) }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPlusCircle}
                                                                className="icon"
                                                            />
                                                            &nbsp; Add to Library
                                                        </Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
























                                            </div>

                                            {/* <Button className='action' onClick={() => { addSong({ title, album, artist: artistsNames, artwork, audio, spotify: true }) }} variant='primary'>Add to Library</Button> */}
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })

                        : 'no found songs try again'
                }
            </Row>
        </Container>


    </>)
}