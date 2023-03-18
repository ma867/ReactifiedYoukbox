
import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import JumbotronBanner from '../../components/Banners/JumbotronBanner'
import InformationalCards from '../../components/pages/Home/InformationalCards'
import Auth from '../AuthPage/Auth'
import Footer from '../../components/Footer/Footer'

export default function Home({ user, setUser, navigate, searchBarData, setSearchBarData, FontAwesomeIcon, uploader,
  UploadButton, options }) {

  const [auth, setAuth] = useState(false)
  return (
    <>


      <NavBar page={'home'} user={user} navigate={navigate} searchBarData={searchBarData}
        setSearchBarData={setSearchBarData} auth={auth} setAuth={setAuth} FontAwesomeIcon={FontAwesomeIcon} />

      {
        auth ?
          <Auth uploader={uploader}
            UploadButton={UploadButton} options={options} navigate={navigate} setUser={setUser} />
          :
          <>
            <JumbotronBanner setAuth={setAuth} />
            <InformationalCards FontAwesomeIcon={FontAwesomeIcon} />
          </>
      }
      <Footer FontAwesomeIcon={FontAwesomeIcon} />


    </>
  )
}
