const SignupForm = () => {
  return (
    <div>
      <form>
        <div className="input">
          <label htmlFor="name">
            Name
            <input type="text" />
          </label>
        </div>
        <div className="input">
          <label htmlFor="email address">
            Email
            <input type="email" />
          </label>
        </div>
        <div className="input">
          <label htmlFor="password">
            Password
            <input type="password" />
          </label>
        </div>
        <div className="input">
          <label htmlFor="password">
            Confirm Password
            <input type="password" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
