import NavBar from "../../components/NavBar/NavBar"

import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Col, Row, Container, Card, Dropdown } from 'react-bootstrap'
import TitleBanner from "../../components/Banners/TitleBanner"
import SongCard from "../../components/Cards/SongCard"
import NotFoundBanner from "../../components/Banners/NotFoundBanner"
import Footer from "../../components/Footer/Footer"
export default function Search({ page,

    user,
    navigate,
    searchBarData,
    setSearchBarData,
    FontAwesomeIcon,
    getRefreshedUser,
    addSong,
    ids,
    setIds,
    foundSongs,
    setFoundSongs,
    foundSongsAudio,
    setFoundSongsAudio,
    foundAlbums,
    setFoundAlbums,
    findSong,
    findSongAudio,
    deleteSongFromSearch

}) {
    const params = useParams()
    const query = params.data





    useEffect(() => {
        getRefreshedUser();
        findSong(query)
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

                            return (
                                <SongCard
                                    page='search'
                                    FontAwesomeIcon={FontAwesomeIcon}
                                    foundSong={foundSong}
                                    foundSongsAudio={foundSongsAudio}
                                    deleteSongFromSearch={deleteSongFromSearch}
                                    addSong={addSong}
                                    idx={idx} />


                            )
                        })

                        :

                        <NotFoundBanner message="We couldn't find any songs with that name. Try again." buttonMessage="Add Songs" />

                }
            </Row>
        </Container>
        <Footer FontAwesomeIcon={FontAwesomeIcon} />


    </>)
}