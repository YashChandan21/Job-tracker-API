const express = require('express');
const { getAllApplications, getApplicationById, getStats, createApplication, updateApplication, deleteApplication} = require('../controllers/applications.controller');

const router = express.Router();

// GET all applications
router.get("/", getAllApplications);

// GET application counts
router.get("/stats", getStats);

// GET a single application by ID/
router.get("/:id", getApplicationById);

// create a new application
router.post("/", createApplication);
// partial update of an application
router.put("/:id", updateApplication);

// delete an application
router.delete("/:id", deleteApplication);

module.exports = router;