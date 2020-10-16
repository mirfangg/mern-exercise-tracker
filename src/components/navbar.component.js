import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand"><h3>ExcerciseTracker</h3></Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar