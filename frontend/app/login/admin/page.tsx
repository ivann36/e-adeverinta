"use client"
import { FormEvent, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { useLoginStore } from '@/app/utils/zustand'

const LoginPage = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isValid, setIsValid] = useState<boolean>(true)
  const { logIn } = useLoginStore();

  const router = useRouter();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
    if (response.ok) {
      const tokens = await response.json()
      localStorage.setItem('access_token', tokens.access_token)
      localStorage.setItem('refresh_token', tokens.refresh_token)
      logIn()
      router.push('/')
    } else {
      setIsValid(false)
    }
  }
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <h2>Login</h2>
        {!isValid && (
          <p className={styles.error}>Wrong username or password</p>
        )}
        <label htmlFor="username">Username</label>
        <input onChange={e => setUsername(e.target.value)} type="text" id="username" name="username" required />

        <label htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
