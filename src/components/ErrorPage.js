import {Redirect} from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div>
            Error Page !
            <Redirect to="/" />
        </div>
    )
}
