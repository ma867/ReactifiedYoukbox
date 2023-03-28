import './Banners.scss'
import DarkButton from '../Buttons/DarkButton'
export default function JumbotronBanner({ setAuth }) {
    return (
        <div className='jumbotron-banner'>
            <div className="mix-blend-mode jumbotron-banner-icon" />
            <div className='section-header  p-3'>
                <h2 className='jumbotron-banner-title display-3  p-3  '>
                    <span className='title light'>
                        Your favorite songs, <br />
                        Your personal jukebox.
                    </span>  <br /><br />
                    <DarkButton buttonHeader='Login to Start Listening' buttonFunction={() => setAuth(true)} />

                </h2>
            </div>
        </div>

    )
}