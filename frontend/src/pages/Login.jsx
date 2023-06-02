import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faBars} />
      </Link>
      <form className="login" onSubmit={handleSubmit}>
        <div className="signInHeader">
          <h4>Sign In</h4>
          <p>Sign in to your account</p>
        </div>
        <label className="emailLabel">Email address:</label>
        <input className="emailInput"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="passwordLabel">Password:</label>
        <input className="passwordInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading} className="signInButtonPage">Sign in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login;