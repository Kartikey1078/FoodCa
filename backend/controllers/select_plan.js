import SelectPlan from "../models/select_plan.js";


// get all plan
export const getPlans = async (req, res) =>{
    try {
        const SelectPlans = await SelectPlan.find({isActive: true});
        res.status(200).json(SelectPlans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch plans', 
            error: error.message 
        });
    }
}

// create plan 
export const createPlan = async (req,res) =>{
    try {
        const newPlan = new SelectPlan(req.body);
        const savePlane = await newPlan.save();
        res.status(201).json("Plan Added!");
    } catch (error) {
        res.status(500).json({ message: 'Failed to create plan', error });
    }
}

// update plan 
export const updatePlan = async (req, res) => {
    try {
      const updatedPlan = await SelectPlan.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedPlan) {
        return res.status(404).json({ message: 'Plan not found' });
      }
  
      res.status(200).json(updatedPlan);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update plan', error });
    }
  };
  

// delete Plan (Soft Delete)
export const deletePlan = async (req, res) => {
    try {
      const deletedPlan = await SelectPlan.findByIdAndUpdate(
        req.params.id,
        { isActive: false },   // mark plan as inactive
        { new: true }
      );
  
      if (!deletedPlan) {
        return res.status(404).json({ message: 'Plan not found' });
      }
  
      res.status(200).json({ message: 'Plan deactivated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete plan', error });
    }
  };
  