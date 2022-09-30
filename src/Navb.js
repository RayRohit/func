import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Calculator from './Calculator/Calculator'
import TicTacToe from './TicTacToe/TicTacToe'
import Todo from './Todo/Todo'

export default function Navb() {
    return (
        <div>
            <BrowserRouter>
                <Navbar expand='lg' bg='dark' variant='dark'>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className='mx-auto'>
                            <Nav.Link as={Link} to='/tictactoe'>Tic Tac Toe</Nav.Link>
                            <Nav.Link as={Link} to='/calc'>Calculator</Nav.Link>
                            <Nav.Link as={Link} to='/todo'>Todo</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes>
                    <Route path='/tictactoe' element={<TicTacToe />} />
                    <Route path='/calc' element={<Calculator />} />
                    <Route path='/todo' element={<Todo />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
