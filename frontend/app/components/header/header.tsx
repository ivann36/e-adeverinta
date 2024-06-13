"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useLoginStore } from '../../utils/zustand';

export const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, logIn, logOut } = useLoginStore()

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    logOut()
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      logIn()
    }
  }, [logIn])

  return (
    <header className={styles.header}>
      <Link href="/"><h1 className={styles.title}>e-adeverinte</h1></Link>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        {

          isLoggedIn ?
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button> :

            < div className={styles.dropdown}>
              <button className={styles.dropdownButton}>
                Login
              </button>
              <div className={styles.dropdownContent}>
                <Link href="/login/admin">Admin</Link>
                <Link href="/google-redirect">Secretary</Link>
              </div>
            </div>
        }
      </nav>

    </header >
  );
};
