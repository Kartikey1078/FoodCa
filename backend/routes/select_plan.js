import express from 'express'

import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/select_plan.js';

const router = express.Router();

// Routes
router.get('/', getPlans); // Get all plans
router.post('/', createPlan); // Create a new plan
router.put('/:id', updatePlan); // Update plan by ID
router.delete('/:id', deletePlan); // Soft delete plan by ID


export default router;