import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((req as any).method === 'POST') {
    const certificateData = req.body;
    try {
      const response = await axios.post('http://localhost:3001/certificates/generate', certificateData, {
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
