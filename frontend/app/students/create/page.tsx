'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Student } from '../../entities/student';
import styles from './styles.module.css';

const CreateStudent: React.FC = () => {
  const router = useRouter()
  const [student, setStudent] = useState<Student>({
    firstName: '',
    lastName: '',
    fatherInitial: '',
    email: '',
    studyCycle: '',
    studyField: '',
    studyForm: '',
    studyYear: 0,
    financiation: 'taxa',
    gender: '',
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Create student data in your API
    const response = await fetch(`/api/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student)
    })
    if (response.ok) {
      router.push('/students')
    }
  }

  return (
    <form className={styles.createStudentContainer} onSubmit={onSubmit}>
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
      <button className={styles.submitButton} type="submit">Create</button>
    </form>);
};

export default CreateStudent;