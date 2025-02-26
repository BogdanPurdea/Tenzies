import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = useState(() => generateDice());
    const [rollCounter, setRollCounter] = useState(0);
    const [time, setTime] = useState(0);
    const { width, height } = useWindowSize();
    const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value);
    const intervalRef = useRef(null);
    const rollButtonRef = useRef(undefined);
    // Start the timer
    const startTimer = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000); // Update every second
        }
    };

    // Stop the timer
    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current); // Clear the interval
            intervalRef.current = null; // Reset the interval ref
        }
    };
    useEffect(() => {
        if (gameWon) {
            rollButtonRef.current.focus();
            stopTimer();
        }
    }, [gameWon])

    function generateDice() {
        return new Array(10)
            .fill(undefined)
            .map((_, index) => (
                {
                    id: index,
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false
                }
            ));
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const diceElements = dice.map(die => <Die key={die.id} dieObj={die} holdFunc={holdDice} />);

    function newGame() {
        setDice(generateDice());
        setRollCounter(0);
        setTime(0);
    }

    function rollDice() {
        setDice(prev => prev.map(die => die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }));
        startTimer();
        setRollCounter(prev => prev + 1);
    }

    function holdDice(id) {
        setDice(prev => prev.map(die => die.id === id ? { ...die, isHeld: !die.isHeld } : die));
    }

    return (
        <main>
            {gameWon && <Confetti
                width={width}
                height={height}
            />}
            <div aria-label="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="timer">Time: {formatTime(time)}</div>
            <div className="rollCounter">Rolls: {rollCounter}</div>
            <div className="dice-container" aria-label="Dice">
                {diceElements}
            </div>
            <button
                className="roll-dice"
                onClick={gameWon ? newGame : rollDice}
                ref={rollButtonRef}
                aria-label={gameWon ? "New Game" : "Roll Dice"}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}