// pages/api/schedule-meeting.js
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Your spreadsheet ID - get this from the URL of your Google Sheet
const SPREADSHEET_ID = '1V_DJGGuiL02KLOn8W4S8b3VmEalq72RU5ZDGJS1A64A';

// Create JWT from service account credentials
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, date, time } = req.body;

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0];

    // Append the row
    await sheet.addRow({
      Name: name,
      Email: email,
      Date: new Date(date).toLocaleDateString(),
      Time: time,
      'Submitted At': new Date().toLocaleString()
    });

    res.status(200).json({ success: true, message: 'Meeting scheduled successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error scheduling meeting' });
  }
}