'use client'
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { Student } from '../entities/student';
import { Pagination } from '../components/pagination/pagination';

const ListStudents: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch students from your API
  useEffect(() => {
    fetch(`/api/student/all?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setStudents(data.students)
        setTotalPages(data.totalPages)
      });
  }, [page, itemsPerPage]);

  const onPageChange = async (page: number) => {
    setPage(page);
  }

  const onEdit = async (student: Student) => {
    if (!student.id) return console.error('No id provided');
    const response = await fetch(`/api/student/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student)
    })
  }

  const onDelete = (id?: number) => {
    console.log(id)
    if (!id) return console.error('No id provided');
    fetch(`/api/student/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setStudents(students.filter((student: Student) => student.id !== id))
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List of Students</h1>
      <Link href={'/students/create'} className={styles.button}>Create</Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father Initial</th>
            <th>Email</th>
            <th>Study Cycle</th>
            <th>Study Field</th>
            <th>Study Form</th>
            <th>Study Year</th>
            <th>Financiation</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: Student, index: number) => (
            <tr key={index}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.fatherInitial}</td>
              <td>{student.email}</td>
              <td>{student.studyCycle}</td>
              <td>{student.studyField}</td>
              <td>{student.studyForm}</td>
              <td>{student.studyYear}</td>
              <td>{student.financiation}</td>
              <td>{student.gender}</td>
              <td>
                <Link href={`/students/${student.id}`} className={styles.button} onClick={() => onEdit(student)}>Edit</Link>
                <button className={styles.button} onClick={() => onDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange} />
    </div>
  );
};

export default ListStudents;