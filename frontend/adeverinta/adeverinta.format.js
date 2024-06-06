import { useState } from 'react';
import axios from 'axios';

const CertificateForm = () => {
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
    setCertificate(prevCertificate => ({
      ...prevCertificate,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/generate-pdf', certificate, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', `certificate_${certificate.studentName}.pdf`);

    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Eliberarea resurselor
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="studentName" value={certificate.studentName} onChange={handleChange} placeholder="Student Name" />
      <input name="universityYear" value={certificate.universityYear} onChange={handleChange} placeholder="University Year" />
      <input name="studyYear" value={certificate.studyYear} onChange={handleChange} placeholder="Study Year" />
      <input name="studyProgram" value={certificate.studyProgram} onChange={handleChange} placeholder="Study Program" />
      <input name="studyForm" value={certificate.studyForm} onChange={handleChange} placeholder="Study Form" />
      <input name="feeStatus" value={certificate.feeStatus} onChange={handleChange} placeholder="Fee Status" />
      <input name="purpose" value={certificate.purpose} onChange={handleChange} placeholder="Purpose" />
      <button type="submit">Generate Certificate</button>
    </form>
  );
};

export default CertificateForm;
