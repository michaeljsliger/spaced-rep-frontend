import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="white-color">
        <span>
          {this.context.user.name}
        </span>
        <nav className="nav-container">
          <div>
            <Link className="white-color"
              onClick={this.handleLogoutClick}
              to='/login'>
              Logout
          </Link>
          </div>
          <div>
            <Link className="white-color" to="/">Dashboard</Link>
          </div>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="header-text nav-text" to='/login'>Login</Link>

        <Link className="header-text nav-text" to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link className="header-text" to='/'>
            Spaced Repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
