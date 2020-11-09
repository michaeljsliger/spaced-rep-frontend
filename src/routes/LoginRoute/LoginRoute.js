import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './loginRoute.css';

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="login-reg-route">
        <div className="log-route-header">
          <p>Practice learning a language with the spaced reptition revision technique.</p>
        <h2>Login</h2>
        </div>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
