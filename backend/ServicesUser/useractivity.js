const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');
const { v4: uuidv4 } = require('uuid');

function userActivity(connection) {

router.post('/usersactivity', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from URL parameter
    const tokenUserId = req.user.id; // Assuming "id" is the user ID in the token payload
    const idactivity = uuidv4();
    // Check if the user making the request matches the requested user ID

    const { action, plantskind, diseasesname, icon } = req.body;

    if (userId !== tokenUserId) {
        return res.status(403).json({ error: 'Access denied' });
    }
    const insertQuery = 'INSERT INTO usersactivity (idactivity, userid, action, plantskind, diseasesname, icon) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [idactivity, userId, action, plantskind, diseasesname, icon], (error, results) => {
        if (error) {
        return res.status(404).json({ error: 'Not null' + error });
        }
        res.status(200).send('Activity Posted');
    });
    });

  // Assuming your JWT payload contains a user ID (e.g., "id" claim)
  router.get('/usersactivity', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from URL parameter
    const tokenUserId = req.user.id; // Assuming "id" is the user ID in the token payload
  
    // Check if the user making the request matches the requested user ID
    if (userId !== tokenUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }
  
    const selectQuery = 'SELECT * FROM usersactivity WHERE userid = ?';
    
    // Execute the SQL query to fetch user activity data
    connection.query(selectQuery, [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Database error' }); // Handle database error
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      res.status(200).json({results});
    });
  });

  router.delete('/usersactivity', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from URL parameter
    const tokenUserId = req.user.id; // Assuming "id" is the user ID in the token payload
    

    const { idActivity } = req.body;

    if (userId !== tokenUserId) {
      return res.status(403).json({ error: 'Access denied' });
    } 
    // Check if the user making the request matches the requested user ID

    const deleteQuery = 'DELETE FROM usersactivity WHERE idactivity = ?';
    
    connection.query(deleteQuery, [idActivity], (err, result) => {
      if (err) {
        console.error('Error deleting activity:', err);
        res.status(500).json({ error: 'Failed to delete activity' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Failed to delete activity. Activity not found!' });
        return;
      }

      res.status(200).json({ message: 'Activity deleted' });
    });
  });

 
  return router;
}

module.exports = userActivity;