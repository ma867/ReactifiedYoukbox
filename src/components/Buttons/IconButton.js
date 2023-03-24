import { Button } from "react-bootstrap"
import './Buttons.scss'
export default function IconButton({ buttonHeader, buttonFunction }) {
    return (
        <Button className='icon-button' onClick={buttonFunction}>{buttonHeader}</Button>
    )
}