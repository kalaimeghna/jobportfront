const Login = () => {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border p-3 rounded"
          placeholder="Password"
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;