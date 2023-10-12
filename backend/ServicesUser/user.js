const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

function userRouter(connection) {
  // Assuming your JWT payload contains a user ID (e.g., "id" claim)
  router.get('/users', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from URL parameter
    const tokenUserId = req.user.id; // Assuming "id" is the user ID in the token payload
    // Check if the user making the request matches the requested user ID
    if (userId !== tokenUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const selectQuery = 'SELECT * FROM usersprofile WHERE id = ?';
    connection.query(selectQuery, [userId], (error, results) => {
      if (error) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('Data retrieved successfully:', results);
      res.status(200).json(results);
    });
  });

  router.put('/users', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from the token payload
    const tokenUserId = req.user.id;

    // Check if the user making the request matches the requested user ID
    if (userId !== tokenUserId) {
      return res.status(401).json({ error: 'Access denied' });
    }

    // Extract updated user profile data including firstname and lastname
    const { firstname, lastname } = req.body;

     if (!firstname || !lastname) {
      return res.status(403).json({ error: 'Firstname and lastname are required' });
    }
    const updateQuery = 'UPDATE usersprofile SET firstname = ?, lastname = ? WHERE id = ?';
    connection.query(updateQuery, [firstname, lastname, userId], (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to update user profile' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      console.log('User profile updated successfully');
      res.status(200).json({ message: 'User profile updated' });
    });
  });
  return router;
}

module.exports = userRouter;