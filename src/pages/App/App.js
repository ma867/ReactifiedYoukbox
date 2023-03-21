import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { UploadButton } from 'react-uploader'
import { Uploader } from 'uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Home from '../HomePage/Home'
import Songs from '../SongsPage/Songs'
import Playlists from '../PlaylistsPage/Playlists'
import Playlist from '../PlaylistPage/Playlist'
import Search from '../SearchPage/Search'




function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState(getUser())
  const [searchBarData, setSearchBarData] = useState("")

  //UPLOAD STATES
  const [showUploadSongModal, setShowUploadSongModal] = useState(false)
  //UPDATE STATES
  const [updatedArtwork, setUpdatedArtwork] = useState('')


  const [showUpdateSongModal, setShowUpdateSongModal] = useState(false)
  const [showUpdatePlaylistModal, setShowUpdatePlaylistModal] = useState(false)
  const [song, setSong] = useState(null)
  const [playlist, setPlaylist] = useState(null)
  const [updatedPlaylistArtwork, setUpdatedPlaylistArtwork] = useState(playlist?.artwork)
  //SEARCH SONG SPOTIFY STATES
  const [ids, setIds] = useState('')
  const [foundSongs, setFoundSongs] = useState([])
  const [foundSongsAudio, setFoundSongsAudio] = useState([])
  const [foundAlbums, setFoundAlbums] = useState([])
  const [pollenSongs, setPollenSongs] = useState([])

  //CREATE PLAYLIST STATES
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)
  const [playlistArtwork, setPlaylistArtwork] = useState('')
  const [playlistSongs, setPlaylistSongs] = useState([])

  const [playlistFormData, setPlaylistFormData] = useState({
    title: '',
    description: '',
    userId: user?._id
  })
  //PLAYLISTS
  const [playlists, setPlaylists] = useState([])

  const handleCreatePlaylistChange = (evt) => {
    setPlaylistFormData({ ...playlistFormData, [evt.target.name]: evt.target.value })
  }

  const handleCreatePlaylistSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const playlistFormDataCopy = { ...playlistFormData, playlistArtwork }

      const response = await fetch(`/api/playlists/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...playlistFormDataCopy, artwork: playlistArtwork, songs: playlistSongs })
      })
      const data = await response.json()
      setPlaylistFormData({
        title: '',
        description: '',
        userId: user._id
      })
      setShowCreatePlaylistModal(false)
      getRefreshedUser()
      navigate(`/playlist/${data._id}`)
    } catch (error) {
      console.error(error)
    }
  }
  //

  const uploader = Uploader({
    apiKey: 'free'
  })

  const options = {
    multi: false,
    maxFileCount: 1,
    editor: {
      images: {
        crop: true,
        cropShape: 'circ',
        cropRatio: 1 / 1
      }
    }
  }

  //=============REUSABLE FUNCTIONS===============
  const getRefreshedUser = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addSong = async (songData) => {
    try {
      const response = await fetch(`/api/songs/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...songData })
      })
      const data = await response.json()
      getRefreshedUser()

    } catch (error) {
      console.error(error)
    }
  }
  //===============Playlist

  const addPlaylistSong = async (songData, id) => {
    try {
      const response = await fetch(`/api/songs/playlistSong/${id}/u/${user?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...songData })
      })
      const data = await response.json()

      getRefreshedUser()

    } catch (error) {
      console.error(error)
    }
  }


  const getPlaylist = async (id) => {
    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'

        }
      })
      const data = await response.json()
      setPlaylist(data)

    } catch (error) {
      console.error(error)
    }
  }
  const deletePlaylist = async (id) => {
    try {
      await fetch(`/api/playlists/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigate('/playlists')
    } catch (error) {
      console.error(error)
    }
  }



  const updatePlaylist = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData, artwork: updatedPlaylistArtwork })
      })
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }







  //======================


  const updateSong = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData, artwork: updatedArtwork })
      })
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteSong = async (id) => {
    try {
      await fetch(`/api/songs/${id}/${user?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      getRefreshedUser()
    } catch (error) {
      console.error(error)
    }
  }
  const deleteSongFromSearch = async (id) => {
    try {
      await fetch(`/api/songs/spotifyId/${id}/${user?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      getRefreshedUser()
    }
    catch (error) {
      console.error(error)
    }
  }
  //===========spotify api=================


  const findSong = async (query) => {
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

  const findPollenSongs = async () => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DWWBHeXOYZf74&offset=0&limit=40`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '721e6a3327mshe34359d3563d7e7p1f7ccejsn1d1230e5e489',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      }

      )
      const data = await response.json()
      setPollenSongs(data.items)

      let ids = ''
      data.items.map((foundSong, idx) => {
        if (idx === data.items.length - 1) {
          ids += foundSong.track.id
        } else {
          ids += foundSong.track.id + ','
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


  //==========handle update=================
  const handleChangeUpdateSong = (evt) => {
    setSong({ ...song, [evt.target.name]: evt.target.value })
  }
  const handleChangeUpdatePlaylist = (evt) => {
    setPlaylist({ ...playlist, [evt.target.name]: evt.target.value })
  }

  return (
    <>
      {user
        ? (
          <Routes>
            <Route
              path='/'
              element={
                <Songs
                  page='songs'
                  user={user}
                  navigate={navigate}
                  searchBarData={searchBarData}
                  setSearchBarData={setSearchBarData}
                  FontAwesomeIcon={FontAwesomeIcon}
                  uploader={uploader}
                  UploadButton={UploadButton}
                  options={options}
                  getRefreshedUser={getRefreshedUser}
                  deleteSong={deleteSong}
                  showUploadSongModal={showUploadSongModal}
                  setShowUploadSongModal={setShowUploadSongModal}

                  updatedArtwork={updatedArtwork}
                  setUpdatedArtwork={setUpdatedArtwork}
                  showUpdateSongModal={showUpdateSongModal}
                  setShowUpdateSongModal={setShowUpdateSongModal}
                  song={song}
                  setSong={setSong}
                  updateSong={updateSong}
                  handleChangeUpdateSong={handleChangeUpdateSong}
                />
              }
            />
            <Route path='/playlists' element={<Playlists

              page="playlists"
              user={user}
              navigate={navigate}
              searchBarData={searchBarData}
              setSearchBarData={setSearchBarData}
              FontAwesomeIcon={FontAwesomeIcon}
              uploader={uploader}
              UploadButton={UploadButton}
              options={options}
              showCreatePlaylistModal={showCreatePlaylistModal}
              setShowCreatePlaylistModal={setShowCreatePlaylistModal}

              setPlaylistArtwork={setPlaylistArtwork}


              playlistFormData={playlistFormData}

              handleSubmit={handleCreatePlaylistSubmit}
              handleChange={handleCreatePlaylistChange}

              getRefreshedUser={getRefreshedUser}
              deletePlaylist={deletePlaylist}






            />} />
            <Route path='/playlist/:playlistId' element={<Playlist

              page="playlist"
              user={user}
              navigate={navigate}
              searchBarData={searchBarData}
              setSearchBarData={setSearchBarData}
              FontAwesomeIcon={FontAwesomeIcon}
              uploader={uploader}
              UploadButton={UploadButton}
              options={options}
              getPlaylist={getPlaylist}
              playlist={playlist}
              findSong={findSong}
              foundSongs={foundSongs}

              foundSongsAudio={foundSongsAudio}
              addPlaylistSong={addPlaylistSong}
              deletePlaylist={deletePlaylist}


              showUpdatePlaylistModal={showUpdatePlaylistModal}
              setShowUpdatePlaylistModal={setShowUpdatePlaylistModal}


              //===============
              setShowUpdateSongModal={setShowUpdateSongModal}
              deleteSong={deleteSong}
              setUpdatedArtwork={setUpdatedArtwork}
              setSong={setSong}
              //============
              deleteSongFromSearch={deleteSongFromSearch}
              addSong={addSong}
              updatePlaylist={updatePlaylist}
              handleChangeUpdatePlaylist={handleChangeUpdatePlaylist}
              updatedPlaylistArtwork={updatedPlaylistArtwork}
              setUpdatedPlaylistArtwork={setUpdatedPlaylistArtwork}
              findPollenSongs={findPollenSongs}
              pollenSongs={pollenSongs}






            />} />
            <Route path='/search/:data' element={<Search
              page='search'
              user={user}
              navigate={navigate}
              searchBarData={searchBarData}
              setSearchBarData={setSearchBarData}
              FontAwesomeIcon={FontAwesomeIcon}
              getRefreshedUser={getRefreshedUser}
              addSong={addSong}
              ids={ids}
              setIds={setIds}
              foundSongs={foundSongs}
              setFoundSongs={setFoundSongs}
              foundSongsAudio={foundSongsAudio}
              setFoundSongsAudio={setFoundSongsAudio}
              foundAlbums={foundAlbums}
              setFoundAlbums={setFoundAlbums}
              findSong={findSong}
              findSongAudio={findSongAudio}
              deleteSongFromSearch={deleteSongFromSearch}
            />} />
          </Routes>
        )
        : <Home
          page='home'
          user={user}
          setUser={setUser}
          navigate={navigate}
          searchBarData={searchBarData}
          setSearchBarData={setSearchBarData}
          FontAwesomeIcon={FontAwesomeIcon}
          uploader={uploader}
          UploadButton={UploadButton}
          options={options}
        />


      }
    </>

  )
}

export default App
