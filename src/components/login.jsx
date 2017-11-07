import React from 'react';

const Login = props => (
  <div className="container">
    <div className="top top--login">
      <div className="content content--login">
        <div className="input input--login">
          <a className="input__button input__button--login" href={`${process.env.BACKEND_LOGIN}/login`} onClick={() => props.login()}>LOGIN</a>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
