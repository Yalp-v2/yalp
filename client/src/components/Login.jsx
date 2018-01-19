import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.formData = {
      email: '',
      password: ''
    }
  }

  getFormData(e) {
    e.preventDefault();
    this.formData = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.loginUser(this.formData)
  }

  render() {
    return(
      <div>
        <Link to="/">
          <button type="Home">
            Go Back
          </button>
        </Link>
        <form onSubmit={ this.getFormData.bind(this) }>
          <input ref="email" id="email" type="text" placeholder="Email" />
          <input ref="password" id="password" type="password" placeholder="Password" />
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}


export default Login;
