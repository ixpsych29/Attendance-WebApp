const LoginForm = () => {
  return (
    <div>
      <form>
        <div className="input">
          <label htmlFor="email address">
            <input type="text" />
          </label>
        </div>
        <div className="input">
          <label htmlFor="password">
            <input type="password" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
