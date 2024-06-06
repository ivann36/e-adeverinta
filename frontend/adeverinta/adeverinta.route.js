// pages/api/generate-pdf.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const certificateData = req.body;
    try {
      const response = await axios.post('http://localhost:3002/certificates/generate', certificateData, {
        responseType: 'arraybuffer',
      });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
      res.send(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
