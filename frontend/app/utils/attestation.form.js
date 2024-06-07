// components/CertificateForm.js
import { useState } from 'react';
import axios from 'axios';

const AttestaionForm = () => {
  const [certificate, setCertificate] = useState({
    studentName: '',
    universityYear: '',
    studyYear: '',
    studyProgram: '',
    studyForm: '',
    feeStatus: '',
    purpose: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificate({ ...certificate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/generate-pdf', certificate, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `certificate_${certificate.studentName}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="studentName" onChange={handleChange} placeholder="Student Name" />
      <input name="universityYear" onChange={handleChange} placeholder="University Year" />
      <input name="studyYear" onChange={handleChange} placeholder="Study Year" />
      <input name="studyProgram" onChange={handleChange} placeholder="Study Program" />
      <input name="studyForm" onChange={handleChange} placeholder="Study Form" />
      <input name="feeStatus" onChange={handleChange} placeholder="Fee Status" />
      <input name="purpose" onChange={handleChange} placeholder="Purpose" />
      <button type="submit">Generate Certificate</button>
    </form>
  );
};

export default AttestaionForm;
