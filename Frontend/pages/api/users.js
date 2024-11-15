// pages/api/users.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
      ];
  
      res.status(200).json(users);
    } else {
      res.status(405).end();
    }
  }
  