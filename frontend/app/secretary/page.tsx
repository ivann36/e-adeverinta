"use client"
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Secretary } from '../entities/secretary';
import { jwtFetch } from '../utils/jwtFetch';
import Link from 'next/link';

const SecretaryList: React.FC = () => {
    const [secretaries, setSecretaries] = useState<Secretary[]>([]);

    useEffect(() => {
        jwtFetch({
            url: '/api/secretary/all',
            method: 'GET',
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    console.error('Error fetching data');
                } else {
                    setSecretaries(data);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const onDelete = async (id: number) => {
        const response = await jwtFetch({
            url: `/api/secretary/delete/${id}`,
            method: 'DELETE',
        })
        if (response.ok) {
            alert('Secretary deleted');
        }
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List of Secretaries</h1>
            <Link className={styles.button} href="/secretary/create"> Create </Link>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {secretaries.map((secretary, index) => (
                        <tr key={index}>
                            <td>{secretary.name}</td>
                            <td>{secretary.email}</td>
                            <td>
                                <Link className={styles.button} href={`/secretary/${secretary.id}`}>Edit</Link>
                                <button className={styles.button} onClick={() => { onDelete(secretary.id!) }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecretaryList;