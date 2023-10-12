const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtMiddleware');

function deleteRouter(connection) {
  router.delete('/users', jwtMiddleware.verifyToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from the token payload
    const tokenUserId = req.user.id; // Assuming the user ID is passed as a URL parameter

    // Check if the user making the request matches the requested user ID
    if (userId !== tokenUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const deleteQuery = 'DELETE FROM usersprofile WHERE id = ?';
    
    connection.query(deleteQuery, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Failed to delete user. User not found!' });
        return;
      }

      res.status(200).json({ message: 'User deleted' });
    });
  });

  return router;
}

module.exports = deleteRouter;