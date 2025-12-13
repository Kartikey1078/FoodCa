import NutritionFact from "../models/nutritionFacts.js";

// GET ALL NUTRITION FACTS
export const getNutritionFacts = async (req, res) => {
  try {
    const facts = await NutritionFact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: facts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ONE NUTRITION FACT
export const getNutritionFactById = async (req, res) => {
  try {
    const fact = await NutritionFact.findById(req.params.id);
    if (!fact) {
      return res.status(404).json({ success: false, message: "Nutrition fact not found" });
    }
    res.status(200).json({ success: true, data: fact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE NUTRITION FACT
export const createNutritionFact = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newFact = await NutritionFact.create({
      title,
      description,
      image: req.file.path,
      imagePublicId: req.file.filename,
    });

    res.status(201).json({ success: true, data: newFact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE NUTRITION FACT
export const updateNutritionFact = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    // If new image is uploaded, update image fields
    if (req.file) {
      // Get old fact to delete old image from Cloudinary
      const oldFact = await NutritionFact.findById(req.params.id);
      if (oldFact && oldFact.imagePublicId) {
        // Note: You might want to delete the old image from Cloudinary here
        // For now, we'll just update with the new image
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedFact = await NutritionFact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedFact) {
      return res.status(404).json({ success: false, message: "Nutrition fact not found" });
    }

    res.status(200).json({ success: true, data: updatedFact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE NUTRITION FACT
export const deleteNutritionFact = async (req, res) => {
  try {
    const deletedFact = await NutritionFact.findByIdAndDelete(req.params.id);
    
    if (!deletedFact) {
      return res.status(404).json({ success: false, message: "Nutrition fact not found" });
    }

    // Note: You might want to delete the image from Cloudinary here
    // For now, we'll just delete the record

    res.status(200).json({ success: true, message: "Nutrition fact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// TEST ENDPOINT - Create sample data (for testing only)
export const createTestData = async (req, res) => {
  try {
    // Check if test data already exists
    const existing = await NutritionFact.findOne({ title: "Test Nutrition Fact 1" });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Test data already exists. Use GET /api/nutrition-facts to see all data.",
        data: await NutritionFact.find(),
      });
    }

    // Create sample test data
    const testData = [
      {
        title: "Test Nutrition Fact 1",
        description: "This is a test nutrition fact with sample data",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        imagePublicId: "test_1",
      },
      {
        title: "Test Nutrition Fact 2",
        description: "Another test nutrition fact for API testing",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        imagePublicId: "test_2",
      },
      {
        title: "Test Nutrition Fact 3",
        description: "Third test entry for nutrition facts",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        imagePublicId: "test_3",
      },
    ];

    const created = await NutritionFact.insertMany(testData);

    res.status(201).json({
      success: true,
      message: "Test data created successfully",
      count: created.length,
      data: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
