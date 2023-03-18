import { Button } from "react-bootstrap"
import './Buttons.scss'
export default function FormButton({ buttonHeader }) {
    return (
        <Button type='submit' className='form-button' >{buttonHeader}</Button>
    )
}