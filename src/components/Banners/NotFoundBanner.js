
import { Button } from 'react-bootstrap'
import './Banners.scss'
export default function NotFoundBanner({ message, buttonMessage }) {

    return (<>
        <div className='not-found-banner pt-1 pb-1 '>

            <div className='not-found-banner-icon-container' >
                <div className="mix-blend-mode banner-icon p-2" />
            </div>
            <div className="not-found-banner-text-container p-2 " >
                <h2 className=' display-5  p-3 title '>
                    Hmm...seems like this page is empty.
                </h2>
                <p>{message}</p>
                <br />
                {/* <Button className='not-found-banner-button' >yerr</Button> */}
            </div>

        </div>
    </>)

}