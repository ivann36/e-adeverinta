'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { Student } from '../../entities/student';
import styles from './styles.module.css';
import { jwtFetch } from '@/app/utils/jwtFetch';

const EditStudent: React.FC = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [student, setStudent] = useState<Student | null>(null);

  // Fetch student data from your API
  useEffect(() => {
    jwtFetch({ url: `/api/student/${params.id}`, method: 'GET' })
      .then(response => response.json())
      .then(data => setStudent(data));
  }, [params]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Update student data in your API
    if (!student) return console.error('No student data');
    const response = await jwtFetch({
      url: `/api/student/${params.id}`,
      method: 'PUT',
      body: student
    })
    if (response.ok) {
      router.push('/students')
    }
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <form className={styles.editStudentContainer} onSubmit={onSubmit}>

      <label className={styles.formLabel} >
        First Name:
        <input className={styles.formInput} type="text" value={student.firstName}
          onChange={e => setStudent({ ...student, firstName: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Last Name:
        <input className={styles.formInput} type="text" value={student.lastName}
          onChange={e => setStudent({ ...student, lastName: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Father Initial:
        <input className={styles.formInput} type="text" value={student.fatherInitial}
          onChange={e => setStudent({ ...student, fatherInitial: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Email:
        <input className={styles.formInput} type="email" value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Study Cycle:
        <input className={styles.formInput} type="text" value={student.studyCycle}
          onChange={e => setStudent({ ...student, studyCycle: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Study Field:
        <input className={styles.formInput} type="text" value={student.studyField}
          onChange={e => setStudent({ ...student, studyField: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Study Form:
        <input className={styles.formInput} type="text" value={student.studyForm}
          onChange={e => setStudent({ ...student, studyForm: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Study Year:
        <input className={styles.formInput} type="number" value={student.studyYear}
          onChange={e => setStudent({ ...student, studyYear: Number(e.target.value) })} />
      </label>
      <label className={styles.formLabel} >
        Gender:
        <input className={styles.formInput} type="text" value={student.gender}
          onChange={e => setStudent({ ...student, gender: e.target.value })} />
      </label>
      <label className={styles.formLabel} >
        Financiation:
        <input className={styles.formInput} type="number" value={student.financiation}
          onChange={e => setStudent({ ...student, financiation: e.target.value })} />
      </label>
      <button className={styles.submitButton} type="submit">Update</button>
    </form>);
};

export default EditStudent;