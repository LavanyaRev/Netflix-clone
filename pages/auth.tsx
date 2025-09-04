import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface AuthForm {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const [form, setForm] = useState<AuthForm>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        alert(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="relative w-32 h-12 mx-auto">
          <Image src="/images/logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 rounded-md text-white placeholder-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-zinc-800 rounded-md text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        {/* Extra Info */}
        <p className="text-gray-400 text-sm text-center">
          Don’t have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="text-white cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
