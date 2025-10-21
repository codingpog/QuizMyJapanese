import appLogo from '../assets/appLogo.png'
import {Link, useNavigate} from "react-router-dom"

function Header(): React.JSX.Element {
    const navigate = useNavigate()
    return (
        <header>
            <Link to="/dashboard" className="logo" onClick={() => {navigate(0)}}>
                <img src={appLogo} alt='app-logo'/>
                <h2>Quiz My Japanese</h2>
            </Link>
            <nav>
                <Link to="/dashboard">Home</Link>
                <p>  |  </p>
                <Link to="/about">About</Link>
            </nav>
        </header>
    )
}

export default Header