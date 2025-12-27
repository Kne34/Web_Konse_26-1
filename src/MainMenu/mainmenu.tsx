import { Link } from 'react-router';
import "./mainmenu.css"

function MainMenu(){

    return (
        <div className="mainMenu">
            <div className='judul'>
                <h1>LET'S QUIZ YOUR MEMORY</h1>
            </div>
            <h3>Choose Menu</h3>
            <Link to="/trainer" className="but"> Trainer </Link>
            <Link to="/trainee" className="but"> Trainee</Link>
        </div>
    )

}

export default MainMenu
