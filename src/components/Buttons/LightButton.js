import { Button } from "react-bootstrap"
import './Buttons.scss'
export default function LightButton({ buttonHeader, buttonFunction }) {
    return (
        <Button className='dark-button' onClick={buttonFunction}>{buttonHeader}</Button>
    )
}