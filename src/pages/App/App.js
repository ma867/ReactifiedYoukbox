import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import { UploadButton } from 'react-uploader'
import { Uploader } from 'uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Home from '../HomePage/Home'
import Songs from '../SongsPage/Songs'
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
  const [song, setSong] = useState(null)

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
      await fetch(`/api/songs/${id}`, {
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

  //==========handle update=================
  const handleChangeUpdateSong = (evt) => {
    setSong({ ...song, [evt.target.name]: evt.target.value })
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
            <Route path='/search/:data' element={<Search
              page='search'
              user={user}
              navigate={navigate}
              searchBarData={searchBarData}
              setSearchBarData={setSearchBarData}
              FontAwesomeIcon={FontAwesomeIcon}
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
