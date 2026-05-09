import { JapanStudent } from "../../Models/JapanStudent.js";
import { performance } from 'perf_hooks';
/**
 * @desc    Submit student application with performance & payload monitoring
 * @route   POST /api/students
 */
export const CreateJapanStudent = async (req, res) => {
  const startTime = performance.now();
  try {
    // 1. Diagnostic: Check incoming payload size
    const incomingSize = Buffer.byteLength(JSON.stringify(req.body)) / 1024; // KB
    console.log(`[Diagnostic] Incoming POST Payload: ${incomingSize.toFixed(2)} KB`);
    // 2. Instance Creation
    const newStudent = new JapanStudent(req.body);
    // 3. Execution & Timing
    const savedStudent = await newStudent.save();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(`[Backend] Student save took: ${duration}ms`);
    res.setHeader('Server-Timing', `db_write;dur=${duration};desc="DB Save"`);
    return res.status(201).json({
      message: 'Application submitted successfully',
      id: savedStudent._id,
      duration: `${duration}ms`
    });
  } catch (error) {
    console.error(`[Error] POST Student:`, error);
    // Handle Mongoose Validation or Duplicate Key Errors (CNIC/ID)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate entry: Student ID or CNIC already exists.' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
