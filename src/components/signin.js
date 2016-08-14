import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

// example class based component (smart component)
class SignIn extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onEmailChange(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.signinUser({ email: this.state.email, password: this.state.password });
    this.setState({ email: '' });
    this.setState({ password: '' });
  }

  render() {
    return (
      <div className="new">
        <h3>Sign In</h3>
        <form className="newPost">
          <input type="text" value={this.state.email} name="Title" placeholder="Email" onChange={this.onEmailChange} />
          <input type="text" value={this.state.password} name="Title" placeholder="Password" onChange={this.onPasswordChange} />
          <button type="submit" onSubmit={this.onSubmit}>Sign In</button>
          <Link to="/">Cancel</Link>
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, actions)(SignIn);
