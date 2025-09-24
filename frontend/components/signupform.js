import React from 'react';

export default function SignupForm({ name, phone, email, password, setName, setPhone, setEmail, setPassword, handleSignUp, error, setCurrentPage }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Phone:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" required />
        </div>
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
          Sign Up
        </button>
      </form>
      <div className="mt-6 text-center">
        <button onClick={() => setCurrentPage('login')} className="text-blue-600 hover:underline">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}