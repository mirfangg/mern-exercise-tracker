import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class EditExercises extends Component {  
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // Component lifecycle method
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
          .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            });
          });

        axios.get('http://localhost:5000/users')
          .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username)
                });
            }
          });
    }
    
    // Methods
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // Post data to the backend
        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
          .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h4>Edit Exercise Log</h4>
                <br />
                <form onSubmit={this.onSubmit}>
                    {/* Username */}
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(user => {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    {/* Description */}
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    {/* Duration */}
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    {/* Date */}
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <a href="/"><button className="btn btn-secondary">Cancel</button></a> <input type="submit" value="Save Changes" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercises