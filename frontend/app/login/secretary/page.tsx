'use client';
import { redirect, useSearchParams } from "next/navigation"
import { useEffect } from "react";

const LoginPage = () => {
  const params = useSearchParams();
  useEffect(() => {
    const access = params.get('access_token')
    const refresh = params.get('refresh_token')
    if (refresh && access) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      localStorage.setItem('role', 'secretary')
    }
    redirect('/')
  }, [])
  return <p>Logging in...</p>
}

export default LoginPage;