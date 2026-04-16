import  {Student}  from './DB/Models/Student.js'
import  Notifications  from './DB/Models/Notifications.js'
import { DB_CONNECTED } from './DB_Connect.js'
export default async function handler(req, res) {
  // 1. Only allow POST or GET depending on your preference
  // Using GET allows you to just visit the URL in your browser to trigger it
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 2. Connect using your existing Vercel-compatible logic
    await DB_CONNECTED();

    // 3. Define the date range (April 2026)
    const startDate = new Date('2026-04-08T00:00:00Z');
    const endDate = new Date('2026-04-16T23:59:59Z');

    console.log('🔍 Fetching students...');
    const students = await Student.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (!students.length) {
      return res.status(200).json({ 
        message: '⚠️ No students found in the specified range.',
        range: { startDate, endDate }
      });
    }

    // 4. Create notifications
    const notificationsData = students.map((student) => ({
      StudentName: student.name,
      StudentID: student._id,
      StudentTag: student.studentTag,
      NotificationType: 'New',
      FormFilledOn: student.formFilledOn || student.createdAt,
      createdAt: student.createdAt,
      UpdatedBy: 'nijhum.jan24@gmail.com',
    }));

    // Using insertMany is much faster than Promise.all(create) for bulk operations
    const result = await Notifications.insertMany(notificationsData);

    return res.status(200).json({
      success: true,
      message: `🎉 Success! Created ${result.length} notifications.`,
      count: result.length
    });

  } catch (error) {
    console.error('❌ Error in API Route:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}