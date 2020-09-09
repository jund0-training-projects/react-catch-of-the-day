import React from 'react';
import PropTypes from "prop-types";

// class Login extends React.Component {}
// as a stateless component, need to pass props to reference within
// component
const Login = (props) => (
  <nav className="login">
    <h2>Inventory Logijn</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button
    className="github"
    onClick={() => props.authenticate("Github")}
    >
        Log In with GitHub
    </button>
    <button
    className="facebook"
    onClick={() => props.authenticate("Facebook")}
    >
      Log In with Facebook
    </button>
    <button
    className="twitter"
    onClick={() => props.authenticate("Twitter")}
    >
      Log In with Twitter
    </button>
  </nav>
);

Login.propType = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
