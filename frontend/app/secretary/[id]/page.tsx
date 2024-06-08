'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import styles from './styles.module.css';
import { jwtFetch } from '@/app/utils/jwtFetch';
import { Secretary } from '../../entities/secretary';

const EditSecretary: React.FC = () => {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const [secretary, setSecretary] = useState<Secretary | null>(null);

    // Fetch secretary data from your API
    useEffect(() => {
        jwtFetch({ url: `/api/secretary/${params.id}`, method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSecretary(data)
            });
    }, []);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Update secretary data in your API
        if (!secretary) return console.error('No secretary data');
        const response = await jwtFetch({
            url: `/api/secretary/update/${params.id}`,
            method: 'PUT',
            body: secretary
        })
        if (response.ok) {
            router.push('/secretary')
        }
    }

    if (!secretary) {
        return <div>Loading...</div>;
    }

    return (
        <form className={styles.editSecretaryContainer} onSubmit={onSubmit}>

            <label className={styles.formLabel} >
                Name:
                <input className={styles.formInput} type="text" value={secretary.name}
                    onChange={e => setSecretary({ ...secretary, name: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Surname:
                <input className={styles.formInput} type="text" value={secretary.surname}
                    onChange={e => setSecretary({ ...secretary, surname: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Email:
                <input className={styles.formInput} type="email" value={secretary.email}
                    onChange={e => setSecretary({ ...secretary, email: e.target.value })} />
            </label>
            <label className={styles.formLabel} >
                Title:
                <input className={styles.formInput} type="text" value={secretary.title}
                    onChange={e => setSecretary({ ...secretary, title: e.target.value })} />
            </label>

            <button type="submit" className={styles.submitButton}>Update</button>
        </form>
    );
}

export default EditSecretary;