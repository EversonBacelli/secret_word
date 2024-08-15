import "./Game.css"
import { useState, useRef } from "react"

const Game = ({verifyLetter, picketWord, category, letters, guessedLetters, wrongLetters, guesses, score})=>{
    const [letter, setLetter] = useState()
    const letterInputRef = useRef(null)

    const handleSubmit = (e)=>{
        e.preventDefault()
        verifyLetter(letter)
        setLetter("")
        letterInputRef.current.focus()
    }


    return (
       
        <div className="game" >
             <p className="points">
                <span>Pontuação: {score}</span>
             </p>
             <h1>Adivinhe a Palavra: </h1>
             <h3 className="tip">
                 Dica sobre a palavra: <span> {category} </span>
             </h3>
             <p>Você ainda tem {guesses} tentativa(s).</p>
             <div className="wordContainer">
                {letters.map( (l, i)=>(
                     guessedLetters.includes(l) ? 
                     ( <span key={i} className="letters"> {l} </span>) : 
                     ( <span key={i} className="blankSquare"> </span>)
                     
                ))}
             </div>
            
             <div className="letterContainer">
                    <p>Tente Adivinhar uma letra da palavra: </p>
                    <form onSubmit={handleSubmit}>
                         <input 
                            type="text" 
                            name="letter" 
                            maxLength='1' 
                            required
                            onChange={ (e) => setLetter(e.target.value)}
                            value={letter}
                            ref={letterInputRef}
                        />
                         <button>Jogar</button>
                    </form>
             </div>
             <div className="wrongLettersContainer">
                <p>Letras já utilizadas: </p>
                <span> {wrongLetters}</span>
             </div>
        </div>
    )
}

export default Game