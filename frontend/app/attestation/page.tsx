'use client';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Attestation } from '../entities/attestation';
import { jwtFetch } from '../utils/jwtFetch';

const Attestations: React.FC = () => {
    const [attestations, setAttestations] = useState<Attestation[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAttestations();
    }, [filter]);

    const fetchAttestations = async () => {
        let url = '/api/attestation';
        if (filter !== 'all') {
            url += `/${filter}`;
        }

        // const response = await fetch(url);
        const response = await jwtFetch({ url: url, method: 'GET'});
        const data = await response.json();
        setAttestations(data);
    };

    const approve = async (id: number) => {
        const response = await jwtFetch({ url: `/api/attestation/approve/${id}`, method: 'PATCH' });
        if (response.ok) {
            await fetchAttestations();
        }
    }

    const unapprove = async (id: number) => {
        // const response = await fetch(`/api/attestation/unaprove/${id}`, { method: 'PATCH' })
        const response = await jwtFetch({ url: `/api/attestation/unaprove/${id}`, method: 'PATCH' });
        if (response.ok) {
            await fetchAttestations();
        }
    }

    const reject = async (id: number) => {
        // const response = await fetch(`/api/attestation/reject/${id}`, { method: 'PATCH' })
        const response = await jwtFetch({ url: `/api/attestation/reject/${id}`, method: 'PATCH' });
        if (response.ok) {
            await fetchAttestations();
        }
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Attestations</h1>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setFilter('')}>All</button>
                <button className={styles.button} onClick={() => setFilter('approved')}>Approved</button>
                <button className={styles.button} onClick={() => setFilter('unapproved')}>Unapproved</button>
                <button className={styles.button} onClick={() => setFilter('rejected')}>Rejected</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attestations.length && attestations.map((attestation) => (
                        <tr key={attestation.id}>
                            <td>{attestation.purpose}</td>
                            <td>{attestation.status}</td>
                            <td>
                                <button onClick={() => { approve(attestation.id) }} className={styles.button}>Approve</button>
                                <button onClick={() => { unapprove(attestation.id) }} className={styles.button}>Unapprove</button>
                                <button onClick={() => { reject(attestation.id) }} className={styles.button}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attestations;