import {Link} from "react-router-dom"
import Header from "./Header"

function About(): React.JSX.Element {
    return (
        <>
            <Header />
            <div className="about">
                <h1>About Quiz My Japanese</h1>
                <p>I made Quiz My Japanese to improve my Japanese reading comprehension. This tool takes a Japanese text passage that you input, and generate a comprehension quiz with the help of AI.</p>
                <br></br> 
                <p>To use, simply paste your desired text in the input box and press "Quiz Me!" to test how well you understand the passage. That's it! I hope this tool is useful for you :) </p>
                <Link to="/dashboard">Click here use the tool</Link>
            </div>
        </>
    )
}

export default About