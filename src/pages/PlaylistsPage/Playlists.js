
import NavBar from "../../components/NavBar/NavBar";
import TitleBanner from "../../components/Banners/TitleBanner";
import CreatePlaylistModal from "../../components/Modals/CreatePlaylistModal";
import PlaylistCard from "../../components/Cards/PlaylistCard";
import NotFoundBanner from "../../components/Banners/NotFoundBanner";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Playlists({ page,
    user,
    navigate,
    searchBarData,
    setSearchBarData,
    FontAwesomeIcon,
    uploader,
    UploadButton,
    options,
    setShowCreatePlaylistModal,
    showCreatePlaylistModal,
    setPlaylistArtwork,
    playlistFormData,
    handleChange,
    handleSubmit,
    getRefreshedUser,
    deletePlaylist


}) {


    useEffect(() => {
        getRefreshedUser()

    }, [])

    return (
        <>
            <NavBar
                page="playlists"
                user={user}
                navigate={navigate}
                searchBarData={searchBarData}
                setSearchBarData={setSearchBarData}
                FontAwesomeIcon={FontAwesomeIcon}
                setShowCreatePlaylistModal={setShowCreatePlaylistModal}



            />
            <TitleBanner
                page="playlists"
                user={user}
                cover="https://i.imgur.com/g0ar3Jv.png"
                title="Playlists"
                description="Browse your song collections."
                listLength={user?.playlists?.length}
                FontAwesomeIcon={FontAwesomeIcon}
            />


            {
                showCreatePlaylistModal ?
                    <CreatePlaylistModal
                        showCreatePlaylistModal={showCreatePlaylistModal}
                        setShowCreatePlaylistModal={setShowCreatePlaylistModal}
                        uploader={uploader}
                        UploadButton={UploadButton}
                        options={options}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setPlaylistArtwork={setPlaylistArtwork}


                        playlistFormData={playlistFormData}


                    />
                    :
                    ""
            }
            {
                user?.playlists?.length === 0 ?
                    <NotFoundBanner message="You have no playlists in your library. Go ahead and create some by clicking 'New Playlist' on the navigation bar." />

                    :

                    <Container className='mb-3 mt-3 playlist-cards-container '>
                        <Row className=''>
                            {
                                user?.playlists ?
                                    user?.playlists?.map((playlist, idx) => {
                                        return (
                                            <PlaylistCard
                                                playlist={playlist}
                                                idx={idx}
                                                FontAwesomeIcon={FontAwesomeIcon}
                                                navigate={navigate}
                                                deletePlaylist={deletePlaylist}
                                            />
                                        )
                                    })
                                    :
                                    ""

                            }

                        </Row>
                    </Container>
            }

            <Footer FontAwesomeIcon={FontAwesomeIcon} />
        </>
    )

}