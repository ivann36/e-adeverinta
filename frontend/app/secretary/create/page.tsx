'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from './styles.module.css';
import { jwtFetch } from '@/app/utils/jwtFetch';
import { Secretary } from '@/app/entities/secretary';



const CreateSecretary: React.FC = () => {
    const router = useRouter()
    const [secretary, setSecretary] = useState<Secretary>({
        name: '',
        surname: '',
        email: '',
        title: '',
    });

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Create secretary data in your API
        const response = await jwtFetch(
            {
                url: `/api/secretary/create`,
                method: 'POST',
                body: secretary
            })
        if (response.ok) {
            router.push('/secretary')
        }
    }

    return (
        <form className={styles.createSecretaryContainer} onSubmit={onSubmit}>
            <label className={styles.formLabel} >
                First Name:
                <input className={styles.formInput} type="text" value={secretary.name}
                    onChange={e => setSecretary({ ...secretary, name: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Last Name:
                <input className={styles.formInput} type="text" value={secretary.surname}
                    onChange={e => setSecretary({ ...secretary, surname: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Email:
                <input className={styles.formInput} type="email" value={secretary.email}
                    onChange={e => setSecretary({ ...secretary, email: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Email:
                <input className={styles.formInput} type="email" value={secretary.title}
                    onChange={e => setSecretary({ ...secretary, title: e.target.value })} />
            </label>
            {/* Add other input fields as needed */}
            <button className={styles.submitButton} type="submit">Create Secretary</button>
        </form>
    );
};

export default CreateSecretary;