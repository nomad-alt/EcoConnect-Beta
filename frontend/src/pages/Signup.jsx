import { useState } from "react"
import useSignup from "../hooks/useSignup"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faBars} />
      </Link>
      <form className="login" onSubmit={handleSubmit}>
        <div className="signInHeader">
          <h4>Create your account</h4>
          <p>Join the community of ecoconnect!</p>
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

        <button disabled={isLoading} className="signInButtonPage">Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup