'use client'
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { jwtFetch } from "./utils/jwtFetch";

export default function Home() {
  const [role, setRole] = useState<string | null>();
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const fetchNewEntries = async () => {
    const response = await jwtFetch({ url: "/api/google-sheets", method: "GET" });
    if (response.ok) {
      const entries = await response.json();
      console.log(entries);
    } else {
      console.log("Error fetching new entries");
    }
  }

  if (role === "admin") {
    return (
      <main className={styles.main}>
        <h1>Admin page</h1>
        <Link className={styles.button} href={'/faculty'}>Faculty</Link>
        <Link className={styles.button} href={'/secretary'}>Secretary</Link>
        <Link className={styles.button} href={'/upload/students'}>Upload</Link>
      </main>
    );
  } else if (role === "secretary") {
    return (
      <main className={styles.main}>
        <h1>Secretary page</h1>
        <Link className={styles.button} href={'/attestation'}>Attestations</Link>
        <Link className={styles.button} href={'/students'}>Students</Link>
        <button className={styles.button} onClick={fetchNewEntries}>Fetch new entries</button>
      </main>
    );
  } else {
    return (
      <main className={styles.main}>
        <h1>Please Log in</h1>
        <p>To use application log in!</p>
      </main>
    )
  }
}
