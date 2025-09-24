import React from 'react';
import LoginForm from '../components/loginform';

export default function LoginPage(props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <LoginForm {...props} />
    </div>
  );
}