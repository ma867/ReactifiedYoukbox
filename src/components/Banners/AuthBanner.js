
import { Col } from 'react-bootstrap'
import './Banners.scss'
export default function AuthBanner({ title, subtitle }) {

    return (<>
        <Col lg={6} className='auth-banner banner-image'>
            <div className="auth-banner-icon" />
            <h2 className='auth-banner-title title light display-3 ' style={{ zIndex: '1', position: 'relative' }}>{title}<br />{subtitle}</h2><br />
        </Col>
    </>)

}