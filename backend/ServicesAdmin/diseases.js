const express = require('express');
const router = express.Router();
const jwtMiddleware  = require('../jwtMiddleware');

function diseasesRouter(connection) {
  router.post('/diseases', jwtMiddleware.verifyToken, (req, res) => {
    const { disease, plantskind, detailscontent, treatment, shop } = req.body;
    const userRole = req.user.role; // Get the user's role from the JWT token
    console.log(userRole)
    // Check if the user's role is 1 (assuming 1 means restricted role)
    if (userRole === 1) {
      return res.status(403).json({ error: 'Permission denied' });
    }
  
    const selectQuery = 'SELECT * FROM diseasestable WHERE disease = ?';
    const insertQuery =
      'INSERT INTO diseasestable (disease, plantskind, detailscontent, treatment, shop, role) VALUES (?, ?, ?, ?, ?, ?)';
  
    // Check if a record with the same disease already exists
    connection.query(selectQuery, [disease], (selectError, selectResults) => {
      if (selectError) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // If a record with the same disease exists, return an error
      if (selectResults.length > 0) {
        return res.status(400).json({ error: 'Disease already exists' });
      }
  
      // If the disease doesn't exist and the user's role is allowed (role 2), insert the new record
      if (userRole === 2) {
        connection.query(
          insertQuery,
          [disease, plantskind, detailscontent, treatment, shop, userRole],
          (insertError, insertResults) => {
            if (insertError) {
              return res.status(500).json({ error: 'Data cannot be null' });
            }
  
            // Data inserted successfully
            res.status(201).json({ message: 'Data inserted successfully' });
          }
        );
      } else {
        // If the user's role is not allowed (role 1), return a permission denied error
        return res.status(403).json({ error: 'Permission denied' });
      }
    });
  });

    router.delete('/diseases', (req, res) => {
      const { disease } = req.body;
      const deleteQuery = 'DELETE FROM diseasestable WHERE disease = ?';
    
      // Execute the SQL query to delete data from the database
      connection.query(deleteQuery, [disease], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        // Check if any rows were affected (i.e., if the disease was found and deleted)
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Disease not found' });
        }
    
        // Data deleted successfully
        res.status(200).json({ message: 'Data deleted successfully',results });
      });
    });
    
    router.get('/diseases',(req, res) => {
      const selectQuery = 'SELECT * FROM diseasestable';

      // Execute the SQL query to retrieve data from the database
      connection.query(selectQuery, (error, results) => {
        if (error) {
          console.error('Error retrieving data:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Data retrieved successfully
        console.log('Data retrieved successfully:', results);
        res.status(200).json(results);
      });
    });

    router.get('/diseasesdata',jwtMiddleware.verifyToken, (req, res) => {
      // Get the disease name from the query parameters
      const { diseaseName } =  req.query;
    
      // Define the SQL query with a WHERE clause to filter by disease name
      const selectQuery = 'SELECT * FROM diseasestable WHERE disease = ?';
    
      // Execute the SQL query with the disease name as a parameter
      connection.query(selectQuery, [diseaseName], (error, results) => {
        if (error) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        // Data retrieved successfully
        console.log('Data retrieved successfully:', results);
        res.status(200).json(results);
      });
    });
        


    return router;
  }
module.exports = diseasesRouter;