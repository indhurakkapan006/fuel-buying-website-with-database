import React from 'react';
import SignupForm from '../components/signupform';

export default function SignupPage(props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 p-4">
      <SignupForm {...props} />
    </div>
  );
}