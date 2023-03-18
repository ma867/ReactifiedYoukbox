

import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faCloud, faMusic } from '@fortawesome/free-solid-svg-icons'
import { Container, Row } from 'react-bootstrap'
import InformationalCard from '../../Cards/InformationalCard'

export default function InformationalCards({ FontAwesomeIcon }) {
    return (
        <>

            <section id='information' className='informational-cards pt-5 pb-5'>
                <Container>
                    <Row className='mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center'>
                        <InformationalCard FontAwesomeIcon={FontAwesomeIcon} title='Customize Your Library'
                            description=' Add as many songs as you would like. We will store them on our cloud so you can have all the
                         artists you know and love whenever and wherever you want it!' icon={faCloud} />
                        <InformationalCard FontAwesomeIcon={FontAwesomeIcon} title='Create your own soundtrack' description=' Create as many playlists as you want with your library songs. Get creative and make
                soundstracks for your every day life.' icon={faMusic} />
                        <InformationalCard FontAwesomeIcon={FontAwesomeIcon} title='Spotify Music Library' description=" Don't wanna add your own music? Use our spotify extension to browse from thousands of
                artists already on this platform." icon={faSpotify} />
                    </Row>
                </Container>
            </section>

        </>
    )

}