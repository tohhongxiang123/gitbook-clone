import React from 'react'
import Home from './views/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/main.scss'

export default function App() {
    return (
        <div style={{height: '100vh'}}>
            <Router>
                <Route path="/">
                    <Home /> 
                </Route>
            </Router>
        </div>
    )
}
