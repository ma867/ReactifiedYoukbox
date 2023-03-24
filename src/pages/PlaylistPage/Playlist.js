
import NavBar from "../../components/NavBar/NavBar";
import TitleBanner from "../../components/Banners/TitleBanner";
import NotFoundBanner from "../../components/Banners/NotFoundBanner";
import SongList from "../../components/Lists/SongList";
import PlaylistSongList from "../../components/Lists/PlaylistSongList"
import UpdatePlaylistModal from "../../components/Modals/UpdatePlaylistModal";
import RecommendedSongList from "../../components/Lists/RecommendedSongList";


import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Playlist({

    user,
    navigate,
    searchBarData,
    setSearchBarData,
    FontAwesomeIcon,
    uploader,
    UploadButton,
    options,
    getPlaylist,
    playlist,
    findSong,
    foundSongs,
    foundSongsAudio,
    addPlaylistSong,
    deletePlaylist,
    showUpdatePlaylistModal,
    setShowUpdatePlaylistModal,

    setShowUpdateSongModal,
    deleteSong,
    setUpdatedArtwork,
    setSong,
    updatePlaylist,
    handleChangeUpdatePlaylist,

    findPollenSongs,
    pollenSongs,
    getRefreshedUser,
    deleteSpotifyPlaylistSong

}) {
    const params = useParams()

    const handleSearchBarChange = (e) => {
        setSearchBarData(e.target.value);
    };

    const handleSearchBarSubmit = (e) => {
        e.preventDefault();
        findSong(searchBarData)
    };
    useEffect(() => {
        getRefreshedUser()
        getPlaylist(params.playlistId)
        findPollenSongs()
    }, [])
    return (

        <>
            <NavBar page="playlist"
                user={user}
                navigate={navigate}
                searchBarData={searchBarData}
                setSearchBarData={setSearchBarData}
                FontAwesomeIcon={FontAwesomeIcon}
            />

            <TitleBanner
                page="playlist"
                user={user}
                cover={playlist?.artwork}
                title={playlist?.title}
                description={playlist?.description}
                listLength={playlist?.songs?.length}
                FontAwesomeIcon={FontAwesomeIcon}
                deletePlaylist={() => { deletePlaylist(params.playlistId) }}
                setShowUpdatePlaylistModal={() => { setShowUpdatePlaylistModal(true) }}
            />



            {playlist?.songs && playlist?.songs?.length > 0 ?
                <SongList
                    songs={playlist?.songs}
                    setShowUpdateSongModal={setShowUpdateSongModal}
                    setSong={setSong}
                    deleteSong={deleteSong}
                    setUpdatedArtwork={setUpdatedArtwork}
                    FontAwesomeIcon={FontAwesomeIcon}
                    page='playlist'
                    playlistId={playlist?._id} />
                :
                <>
                    <NotFoundBanner message="Your playlist is empty. Add songs below or use the search bar to find your favorites tunes." buttonMessage="Add Songs" />
                </>
            }

            {
                showUpdatePlaylistModal ?

                    <UpdatePlaylistModal

                        showUpdatePlaylistModal={showUpdatePlaylistModal}
                        setShowUpdatePlaylistModal={setShowUpdatePlaylistModal}
                        playlist={playlist}
                        updatePlaylist={updatePlaylist}
                        handleChangeUpdatePlaylist={handleChangeUpdatePlaylist}
                        uploader={uploader}
                        options={options}
                        UploadButton={UploadButton}
                    />
                    : ""
            }

            <Container className="mt-5  mb-5 overflow-auto playlist-song-container-text" >
                <div className="flex horizontal space-between">
                    <h2 className="title">Recommended Songs</h2>

                    <Form className="d-flex" onSubmit={handleSearchBarSubmit}>
                        <Form.Control
                            type="text"
                            placeholder="Search song..."
                            className="me-2"
                            aria-label="Search"
                            onChange={handleSearchBarChange}
                            value={searchBarData}
                        />
                        <Button type="submit" className="nav-search-button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='light m-0' />

                        </Button>
                    </Form>
                </div>
            </Container>

            {
                searchBarData === "" ?

                    <RecommendedSongList
                        foundSongs={pollenSongs}
                        foundSongsAudio={foundSongsAudio}
                        addPlaylistSong={addPlaylistSong}
                        deletePlaylistSong={deleteSong}
                        playlistId={playlist?._id}
                        page='playlist'
                        deleteSpotifyPlaylistSong={deleteSpotifyPlaylistSong}
                        user={user}
                        songs={playlist?.songs}
                        FontAwesomeIcon={FontAwesomeIcon} />

                    : foundSongs?.length === 0 ?

                        <NotFoundBanner message="We haven't found your song yet. Type the name on the bar and hit 'enter' to load results." />
                        :
                        <PlaylistSongList
                            foundSongs={foundSongs}
                            foundSongsAudio={foundSongsAudio}
                            addPlaylistSong={addPlaylistSong}
                            playlistId={params.playlistId}
                            FontAwesomeIcon={FontAwesomeIcon}

                        />
            }



        </>
    )
}