//CSS
import './App.css';

// REACT
import {useCallback, useEffect, useState } from "react"

//COMPONENTES
import StartScreen from './components/StartScreen';

// DATA
import { wordsList } from './data/words';

// Components Stages
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1, name: "start"},
  {id:2, name: "game"}, 
  {id:3, name: "gameOver"}
]

const guessesQtd = 3

function App() {
  // controlador Stages
  const [gameStage, setGameStage] = useState(stages[0].name)

  // lista de palavras e categorias
  const [words] = useState(wordsList)

  // Palavra, categoria e array de lista selecionadas
  const [pickeWord, setPicketWord] = useState("")
  const [picketCategory, setPicketCategory ] = useState()
  const [letters, setLetters] = useState([])

  // Lista de acertos e erros
  const [guessedLetters, setGuessesLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  // Tentativas
  const [guesses, setGuesses] = useState(guessesQtd)

  // Pontuação
  const [score, setScore] = useState(0)
 
  // Limpar a lista de acertos erros 
  const clearLetterStates = ()=>{
    setGuessesLetters([])
    setWrongLetters([])
  }

  const picketWordAndCategory = useCallback(()=>{
      // Selecionando uma categoria
      const categories = Object.keys(words)
      const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
      //Selecionando uma palavra aleatória
      const word = words[category][Math.floor(Math.random() * words[category].length)]
     return {word, category}
  }, [words])

  // Iniciar o jogo
  const startGame = useCallback (()=>{
      // limpar acertos e erros
      clearLetterStates()

      // Definir a palavra do jogo e a dica(categoria)
      const {word, category} = picketWordAndCategory()

      //create array of letter
      let wordLetter = word.split("")
      const l = wordLetter.map( (l)=> l.toLowerCase() )
      
      // Setando os elementos que o jogo irá rodar ao redor - palavra, dica e array de letras da palavra
      setPicketWord(word)
      setPicketCategory(category)
      setLetters(l)

      setGameStage(stages[1].name)
  }, [picketWordAndCategory])

  function verifyLetter(letter){
        // garante que a letra será minúscula
        const normalizerLetter = letter.toLowerCase()

        // check guessed letter or remove a guessed
        if(guessedLetters.includes(normalizerLetter) || wrongLetters.includes(normalizerLetter)){
             return
        } 



        if(letters.includes(normalizerLetter)){
            setGuessesLetters((actualGuessedLetters) => [ ...actualGuessedLetters, normalizerLetter])
        } else {
           setWrongLetters((actualWrongLetters) => [ ...actualWrongLetters , normalizerLetter])

           setGuesses((actualGuesses) => actualGuesses -1)
        }

        
  }
  console.log(guessedLetters)
  console.log(wrongLetters)

  function retry(){
    setScore(0)
    setGuesses(guessesQtd)

    setGameStage(stages[0].name)
    clearLetterStates()

  }

    // condição de derrota
    useEffect(()=>{
      if(guesses <= 0){
          setGameStage(stages[2].name)
      }
  }, [guesses])

  // condição de vitória
  useEffect(()=>{
      const uniqueLetters = [...new Set(letters)]

      // 
      if(guessedLetters.length === uniqueLetters.length && ( guessedLetters.length > 0 && uniqueLetters.length >0 )  ){
          setScore((score) => score += 100)
          startGame()
      }
      //startGame()
  }, [guessedLetters, letters, startGame])

  return (
    <div className="App">
       
       {gameStage === "start" && <StartScreen startGame={startGame}/>  }
       {gameStage === "game" && 
          <Game 
              verifyLetter={verifyLetter} 
              picketWord={pickeWord} 
              category={picketCategory} 
              letters={letters} 
              guessedLetters = {guessedLetters}
              wrongLetters = {wrongLetters}
              guesses = {guesses}
              score = {score}
          />  
        }
       {gameStage === "gameOver" && <GameOver retry={retry} score={score}/>  } 
    </div>
  );
}

export default App;
