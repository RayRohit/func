import React, { useEffect, useState } from 'react'
import './TicTacToe.css'

export default function TicTacToe() {
    const [turn, setTurn] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState(null)
    const [count, setCount] = useState(0)
    const [xScore, setXScore] = useState(0)
    const [yScore, setYScore] = useState(0)
    const [draw, setDraw] = useState(0)
    const checkForWinners = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagnol: [
                [0, 4, 8], [2, 4, 6]
            ]
        };
        for (let combo in combos) {

            // console.log(combo)
            combos[combo].forEach((pattern) => {
                // console.log(pattern);
                if (squares[pattern[0]] === '' || squares[pattern[1]] === '' || squares[pattern[2]] === '') {
                    //do nothing
                }
                else if (squares[pattern[0]] === squares[pattern[1]] && squares[pattern[1]] === squares[pattern[2]]) {
                    setWinner(`${squares[pattern[0]]} is Winner!!`)
                }
                // else if(squares[pattern[0]] !== (squares[pattern[1]] && squares[pattern[2]]) && squares[pattern[1]] !== (squares[pattern[0]] && squares[pattern[2]]) && squares[pattern[2]] !== (squares[pattern[0]] && squares[pattern[1]])){
                //     setWinner('Match Drawn')
                // }
            })
        }
    };

    const handleClick = (num) => {
        let squares = [...cells]
        if (cells[num] !== '') {
            alert('Already Clicked!!')
            return;
        }
        if (turn === 'X') {
            squares[num] = 'X'
            setTurn('O')
        }
        else {
            squares[num] = 'O'
            setTurn('X')
        }
        checkForWinners(squares)
        setCells(squares)
        setCount(count + 1)
    }

    useEffect(() => {
        if (count === 9 && winner === null) setWinner('Draw')
    }, [count])

    const handleRestart = () => {
        if (winner === 'X is Winner!!') {
            setXScore(xScore + 1)
        }
        else if (winner === 'O is Winner!!') {
            setYScore(yScore + 1)
        }
        else if (winner === 'Draw') {
            setDraw(draw + 1)
        }
        setWinner(null)
        setCells(Array(9).fill(''))
        setTurn('X')
        setCount(0)
    }
    const handleScore = () => {
        setXScore(0)
        setYScore(0)
        setDraw(0)
    }
    const Cell = ({ num }) => {
        return (
            <td onClick={() => {
                if (winner === null) handleClick(num)
            }}>{cells[num]}</td>
        )
    }
    return (
        <>
            <div>
                <h1 className='text-white text-center pt-5 fs-1'>Tic Tac Toe</h1>
                <p className='text-white text-center'>Play the tic tac way!!</p>
            </div>
            <div className='main w-100'>
                <div>
                    {
                        winner !== null ?
                            <>
                                <h4 className='fw-bolder fst-italic text-white'>{winner}</h4>
                            </>
                            :
                            <>
                                <h4 className='fw-bolder fst-italic text-white'>Turn {turn}</h4>
                            </>
                    }
                </div>
                <table>
                    <tbody>
                        <tr>
                            <Cell num={0} />
                            <Cell num={1} />
                            <Cell num={2} />
                        </tr>
                        <tr>
                            <Cell num={3} />
                            <Cell num={4} />
                            <Cell num={5} />
                        </tr>
                        <tr>
                            <Cell num={6} />
                            <Cell num={7} />
                            <Cell num={8} />
                        </tr>
                    </tbody>
                </table>
                <button className='btn btn-info mt-3 px-4 text-white' onClick={() => handleRestart()}>Play Again</button>
                <div className='d-flex py-3 text-white'>
                    <h6 className='px-3'>X-Score : {xScore}</h6>
                    <h6 className='px-3'>O-Score : {yScore}</h6>
                    <h6 className='px-3'>Draw : {draw}</h6>
                </div>
                <div>
                    <button className='btn btn-danger' onClick={() => handleScore()}>Reset Score</button>
                </div>
            </div>
        </>
    )
}
