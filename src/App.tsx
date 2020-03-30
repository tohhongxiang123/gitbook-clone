import React from 'react'
import ViewDocuments from './views/ViewDocuments'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './styles/main.scss'

export default function App() {
    return (
        <div style={{height: '100vh'}}>
            <Router>
                <Route path="/" exact>
                    <Redirect to="/documents" />
                </Route>
                <Route path="/documents">
                    <ViewDocuments /> 
                </Route>
            </Router>
        </div>
    )
}
