import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateUsers extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    // Methods
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        // Post data to the backend
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data))

        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <div>
                <h4>Create New User</h4>
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">                      
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUsers