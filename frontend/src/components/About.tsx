import {Link} from "react-router-dom"
import Header from "./Header"

function About(): React.JSX.Element {
    return (
        <>
            <Header />
            <div className="about">
                <h1>About Quiz My Japanese</h1>
                <p>I made Quiz My Japanese to improve my Japanese reading skill. You can use this tool for any desired language. </p>
                <br></br> 
                <p>To use, simply paste an article or link, and the app generates interactive quizzes to test your comprehension. That's it! I hope this tool is useful for you :) </p>
                <Link to="/dashboard">Click here use the tool</Link>
            </div>
        </>
    )
}

export default About