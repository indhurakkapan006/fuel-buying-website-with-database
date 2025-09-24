import React from 'react';

export default function LoginForm({ email, password, setEmail, setPassword, handleLogin, error, message, setCurrentPage }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        </div>
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 text-lg font-semibold rounded-xl hover:bg-blue-700 transition duration-300">
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <button onClick={() => setCurrentPage('signup')} className="text-blue-600 hover:underline">
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}