import { performance } from 'perf_hooks';
import { JapanStudent } from '../../Models/JapanStudent.js';
/**
 * @desc    Fetch all students with pagination to prevent payload bloat
 * @route   GET /api/students
 */
export const GetJapanStudents = async (req, res) => {
  const startTime = performance.now();
  try {
    // Adding pagination as a robustness layer for large datasets
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const allStudents = await JapanStudent.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    if (!allStudents || allStudents.length === 0) {
      return res.status(404).json({ message: 'No students found.' });
    }
    // --- DIAGNOSTIC SECTION ---
    const totalSize = Buffer.byteLength(JSON.stringify(allStudents)) / 1024 / 1024; // MB
    const avgSize = (Buffer.byteLength(JSON.stringify(allStudents[0])) / 1024).toFixed(2); // KB
    console.log(`[Diagnostic] Total Payload: ${totalSize.toFixed(2)} MB`);
    console.log(`[Diagnostic] Avg Student Size: ${avgSize} KB`);
    // --------------------------
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    console.log(`[Backend] Student fetch took: ${duration}ms`);
    res.setHeader('Server-Timing', `db_read;dur=${duration};desc="DB Fetch"`);
    return res.status(200).json({
      count: allStudents.length,
      payloadSize: `${totalSize.toFixed(4)} MB`,
      data: allStudents
    });
  } catch (error) {
    console.error(`[Error] GET Students:`, error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};