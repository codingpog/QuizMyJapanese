import appLogo from '../assets/appLogo.png'

function Header(): React.JSX.Element {
    return (
        <header>
            <nav>
                <img src={appLogo} alt='app-logo'/>
                <h1>Quiz My Japanese</h1>
            </nav>
        </header>
    )
}

export default Header