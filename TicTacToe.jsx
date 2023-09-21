import React, { useState } from 'react';
import './TicTacToe.css';
import oImage from '../Assets/o.png';
import xImage from '../Assets/x.png';

const TicTacToe = () => {
    let message = '';

    const [game, setGame] = useState(false);
    const [grid, setGrid] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);

    const [count, setCount] = useState(0);

    if (count === 10 && game === false)
        message = "It's a tie!";

    if (game){
        if (count % 2 === 0)
            message = "Player 1 wins!";
        else
            message = "Player 2 wins!";
    }

    const handleButtonClick = (rowIndex, colIndex) => {
        if (grid[rowIndex][colIndex] === '' && count % 2 === 0 && game === false) {
            const newGrid = [...grid];
            newGrid[rowIndex][colIndex] = '2';
            setGrid(newGrid);
            setCount(count + 1);
        } else if (grid[rowIndex][colIndex] === '' && count % 2 === 1 && game === false) {
            const newGrid = [...grid];
            newGrid[rowIndex][colIndex] = '1';
            setGrid(newGrid);
            setCount(count + 1);
        }
    };

    const startOver = () => {
        const newGrid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        setGrid(newGrid);
        setCount(1);
        setGame(false);
    };

    const checkWin = (rowIndex, colIndex) => {
        let hold = grid[rowIndex][colIndex];
        let count = 0;
        for (let i = 0; i < 3; ++i) {
            if (grid[rowIndex][i] === hold) {
                ++count;
            }
            else  
                break;
        }
        if (count === 3) {
            setGame(true);
            return;
        }
        else{
            count = 0;
        }

        for (let i = 0; i < 3; ++i) {
            if (grid[i][colIndex] === hold) {
                ++count;
            }
            else
                break;
        }
        if (count === 3) {
            setGame(true);
            return;
        }
        else{
            count = 0;
        }

        if (rowIndex === 0 && colIndex === 0) {
            if (grid[rowIndex + 1][colIndex + 1] === hold && grid[rowIndex + 2][colIndex + 2] === hold) {
                setGame(true);
                return;
            }
        }

        if (rowIndex === 0 && colIndex === 2) {
            if (grid[rowIndex + 1][colIndex - 1] === hold && grid[rowIndex + 2][colIndex - 2] === hold) {
                setGame(true);
                return;
            }
        }

        if (rowIndex === 2 && colIndex === 2) {
            if (grid[rowIndex - 1][colIndex - 1] === hold && grid[rowIndex - 2][colIndex - 2] === hold) {
                setGame(true);
                return;
            }
        }

        if (rowIndex === 2 && colIndex === 0) {
            if (grid[rowIndex - 1][colIndex + 1] === hold && grid[rowIndex - 2][colIndex + 2] === hold) {
                setGame(true);
                return;
            }
        }


        
    }

    return (
        <div>
            <h1 className="Title"> Tic-Tac-Toe </h1>
            <div className="grid-container">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => (
                            <button
                                key={colIndex}
                                className="grid-button"
                                onClick={() => {handleButtonClick(rowIndex, colIndex)
                                    checkWin(rowIndex, colIndex)
                                }}
                            >
                                {grid[rowIndex][colIndex] === '1' && 
                                    <img className="image" src={xImage} alt="X" />
                                }
                                {grid[rowIndex][colIndex] === '2' && 
                                    <img className="image" src={oImage} alt="O" />
                                }

                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <button class="Reset" onClick={() => startOver()}>
                    Reset
                </button>
            </div>
            <p class="Message">
                {message}
            </p>
        </div>
    );
};

export default TicTacToe;


