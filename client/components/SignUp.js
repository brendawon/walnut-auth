import React from "react";

const SignUp = (props) => {
  return (
    <div>
      <form>
        <input name="username" />
        <input name="password" />
        <input name="confirmPW" />
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
