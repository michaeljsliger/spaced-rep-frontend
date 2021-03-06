import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'
import TokenService from '../../services/token-service'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    }).then(() => {
    return AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
    }).then(auth => {
      return TokenService.saveAuthToken(auth.authToken)
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className="Registration-Form"
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className="registration-box">
          <Label htmlFor='registration-name-input'>
            Enter your name <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className="registration-box">
          <Label htmlFor='registration-username-input'>
            Choose a username <Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div className="registration-box">
          <Label htmlFor='registration-password-input'>
            Choose a password <Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <footer>
          <div className="registration-box">
          <Button type='submit'>
            Sign up
          </Button>
          </div>
          {' '}
          <div className="registration-box">
          <Link to='/login'>Already have an account?</Link>
          </div>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
