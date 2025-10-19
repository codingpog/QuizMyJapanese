import appLogo from '../assets/appLogo.png'
import {Link} from "react-router-dom"

function Header(): React.JSX.Element {
    return (
        <header>
            <div className="logo">
                <img src={appLogo} alt='app-logo'/>
                <h1>Quiz My Japanese</h1>
            </div>
            <nav>
                <Link to="/dashboard">Home</Link>
                <p>  |  </p>
                <Link to="/about">About</Link>
            </nav>
        </header>
    )
}

export default Header