import { useState } from 'react';
import { supabase } from './supabaseClient';

function Signup({ onSwitch, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    onSuccess?.(data.session);
    setLoading(false);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-emerald-500/10 backdrop-blur">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Join Green Waves</p>
        <h2 className="text-3xl font-semibold text-white">Create your account</h2>
        <p className="text-sm leading-6 text-slate-400">
          Start exploring the trading dashboard with a secure account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
            placeholder="Choose a password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}

      <p className="mt-6 text-sm text-slate-400">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="font-semibold text-emerald-400 hover:text-emerald-300">
          Log in
        </button>
      </p>
    </div>
  );
}

export default Signup;
