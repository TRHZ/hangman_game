import hangman from '../img/hangman.png';
import '../css/main.css';


export default function Welcome(){
    return (
        <div className="wrapped">
            <h1>Welcome to Fallout</h1>
            <h2>The hangman of the wasteland</h2>
            <img src={hangman} alt="hangman image.." width={200} height={200} />
        </div>
    );
}