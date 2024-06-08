"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';

const FacultyPage = () => {
    const [id, setId] = useState(0);
    const [fullName, setFullName] = useState('');
    const [shortName, setShortName] = useState('');
    const [currentAcademicYear, setCurrentAcademicYear] = useState('');
    const [deanName, setDeanName] = useState('');
    const [chiefSecretaryName, setChiefSecretaryName] = useState('');

    useEffect(() => {
        // Fetch the faculty information
        fetch('/api/faculty')
            .then(response => response.json())
            .then(data => {
                setFullName(data.fullName);
                setShortName(data.shortName);
                setCurrentAcademicYear(data.currentAcademicYear);
                setDeanName(data.deanName);
                setChiefSecretaryName(data.chiefSecretaryName);
                setId(data.id);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch faculty information');
            });

    }, [])
    const handleEdit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Call the API to edit the faculty information
        fetch('/api/faculty/' + id.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName,
                shortName,
                currentAcademicYear,
                deanName,
                chiefSecretaryName,
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert('Faculty information edited successfully');
                } else {
                    alert('Failed to edit faculty information');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to edit faculty information');
            });
    };

    return (
        <div className={styles.container}>
            <h1>Edit Faculty Information</h1>
            <form className={styles.form} onSubmit={handleEdit}>
                <label className={styles.label}>
                    Full Name:
                    <input className={styles.input} type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Short Name:
                    <input className={styles.input} type="text" value={shortName} onChange={e => setShortName(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Current Academic Year:
                    <input className={styles.input} type="text" value={currentAcademicYear} onChange={e => setCurrentAcademicYear(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Dean Name:
                    <input className={styles.input} type="text" value={deanName} onChange={e => setDeanName(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Chief Secretary Name:
                    <input className={styles.input} type="text" value={chiefSecretaryName} onChange={e => setChiefSecretaryName(e.target.value)} />
                </label>
                <button className={styles.button} type="submit">Edit</button>
            </form>
        </div>
    );
};

export default FacultyPage;