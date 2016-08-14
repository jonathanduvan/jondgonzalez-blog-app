import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

// example class based component (smart component)
class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
      username: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onNameChange(event) {
    this.setState({ username: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.signupUser({
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    });
    this.setState({
      email: '',
      password: '',
      name: '',
    });
  }

  render() {
    return (
      <div className="new">
        <h3>Sign Up</h3>
        <form className="newPost">
          <input type="text" value={this.state.email} name="Title" placeholder="Email" onChange={this.onEmailChange} />
          <input type="text" value={this.state.password} name="Title" placeholder="Password" onChange={this.onPasswordChange} />
          <input type="text" value={this.state.name} name="Title" placeholder="Name" onChange={this.onNameChange} />
          <button type="submit" onClick={this.Submit}>Create Account</button>
          <Link to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default connect(mapDispatchToProps, actions)(SignUp);
