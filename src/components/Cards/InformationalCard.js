
import './Cards.scss'
import { Col } from 'react-bootstrap'

export default function InformationalCard({ FontAwesomeIcon, icon, title, description }) {
    return (

        <Col>
            <div className='service-card'>
                <div className='icon-wrapper'>
                    <FontAwesomeIcon icon={icon} />
                </div>

                <h3 className='title'>{title}</h3>
                <p>
                    {description}
                </p>
            </div>
        </Col>
    )

}