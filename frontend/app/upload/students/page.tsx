"use client";
import { jwtFetch } from '@/app/utils/jwtFetch';
import styles from './styles.module.css';

const Upload = () => {
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // const response = await fetch('/api/admin/upload', {
        //     headers: {
        //     },
        //     method: 'POST',
        //     body: formData,
        // });
        console.log(formData)
        const response = await jwtFetch(
            {
                url: '/api/admin/upload',
                method: 'POST',
                body: formData
            }
        )
        if (response.status === 201) alert('File uploaded successfully');
        else alert('Error uploading file');
        const data = await response.text();
        console.log(data)
    }
    return <div>
        <h1>Upload</h1>
        <form onSubmit={onSubmit}>
            <input type="file" name="file" />
            <button className={styles.button} type="submit">Upload</button>
        </form>
    </div>
}

export default Upload;