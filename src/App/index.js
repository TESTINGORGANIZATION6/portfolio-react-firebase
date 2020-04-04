import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signup from '../Component/Signup/Signup';
import Home from '../Component/Home/Home';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/signup' component={Signup} />
                </div>
            </BrowserRouter>
        </div>
    )
}


export default App;