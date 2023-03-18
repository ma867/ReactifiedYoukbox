import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import TitleBanner from "../../components/Banners/TitleBanner";
import UploadSongModal from "../../components/Modals/UploadSongModal";
import UpdateSongModal from "../../components/Modals/UpdateSongModal";
import NotFoundBanner from "../../components/Banners/NotFoundBanner";
import Footer from "../../components/Footer/Footer";
import SongList from "../../components/Lists/SongList";


export default function Songs({
    page,
    user,
    navigate,
    searchBarData,
    setSearchBarData,
    FontAwesomeIcon,
    uploader,
    UploadButton,
    options,
    getRefreshedUser,
    deleteSong,
    showUploadSongModal,
    setShowUploadSongModal,


    showUpdateSongModal,
    setShowUpdateSongModal,
    updateSong,
    handleChangeUpdateSong,
    song,
    setSong,
    setUpdatedArtwork,
    updatedArtwork

}) {
    const [songFormData, setSongFormData] = useState({
        title: "",
        artist: "",
        album: "",
        audio: "",
        userId: user?._id,
    });
    const [artwork, setArtwork] = useState("https://i.imgur.com/0FUT9eJ.png");

    const handleChange = (evt) => {
        setSongFormData({ ...songFormData, [evt.target.name]: evt.target.value });
    };


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const songFormDataCopy = { ...songFormData, artwork };

            const response = await fetch(`/api/songs/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...songFormDataCopy }),
            });
            setSongFormData({
                title: "",
                artist: "",
                album: "",
                audio: "",
                userId: user._id,
            });
            setShowUploadSongModal(false);
            getRefreshedUser();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRefreshedUser();
    }, []);

    return (
        <>
            <NavBar
                page="songs"
                user={user}
                navigate={navigate}
                searchBarData={searchBarData}
                setSearchBarData={setSearchBarData}
                FontAwesomeIcon={FontAwesomeIcon}
                setShowUploadSongModal={setShowUploadSongModal}
            />
            <TitleBanner
                page="songs"
                user={user}
                cover="https://i.imgur.com/g0ar3Jv.png"
                title="Song Library"
                description="All your favorites in one place."
                listLength={user?.songs?.length}
                FontAwesomeIcon={FontAwesomeIcon}
            />

            {showUploadSongModal ? (
                <UploadSongModal
                    setShowUploadSongModal={setShowUploadSongModal}
                    uploader={uploader}
                    UploadButton={UploadButton}
                    options={options}
                    songFormData={songFormData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    setArtwork={setArtwork}
                />
            ) : showUpdateSongModal ?
                (
                    <UpdateSongModal

                        setUpdatedArtwork={setUpdatedArtwork}
                        showUpdateSongModal={showUpdateSongModal}
                        setShowUpdateSongModal={setShowUpdateSongModal}
                        song={song}

                        updateSong={updateSong}
                        handleChangeUpdateSong={handleChangeUpdateSong}
                        uploader={uploader}
                        options={options}
                        UploadButton={UploadButton}
                    />
                ) :
                ""}

            {user?.songs && user?.songs.length > 0 ? (
                <SongList
                    songs={user?.songs}
                    setShowUpdateSongModal={setShowUpdateSongModal}
                    setSong={setSong}
                    deleteSong={deleteSong}
                    setUpdatedArtwork={setUpdatedArtwork}
                    FontAwesomeIcon={FontAwesomeIcon} />
            ) : (
                <NotFoundBanner message="Your library is currently empty. Add songs below or use the search bar to find your favorites tunes." buttonMessage="Add Songs" />
            )}

            <Footer FontAwesomeIcon={FontAwesomeIcon} />
        </>
    );
}
