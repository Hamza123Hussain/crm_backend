import { MongoClient, ObjectId } from 'mongodb'
const dbName = 'test' // 👈 Your database name is test

async function updateFormFilledOn() {
  const client = new MongoClient(
    'mongodb+srv://octtoppus1:OCTTOPPUS1@gg1208crm.dy2kw.mongodb.net/?retryWrites=true&w=majority&appName=GG1208CRM'
  )

  try {
    await client.connect()
    const db = client.db(dbName)
    const notificationsCollection = db.collection('notifications')
    const studentsCollection = db.collection('students')

    const notifications = await notificationsCollection
      .find({ StudentTag: 'Signed Up', FormFilledOn: { $exists: false } })
      .toArray()

    let updatedCount = 0

    for (const notification of notifications) {
      const studentId =
        typeof notification.StudentID === 'string'
          ? new ObjectId(notification.StudentID)
          : notification.StudentID

      const student = await studentsCollection.findOne({ _id: studentId })

      if (student?.createdAt) {
        const result = await notificationsCollection.updateOne(
          { _id: notification._id },
          { $set: { FormFilledOn: student.createdAt } }
        )
        if (result.modifiedCount === 1) {
          console.log(`✅ Updated notification ${notification._id}`)
          updatedCount++
        }
      } else {
        console.log(
          `❌ No student found for StudentID ${notification.StudentID}`
        )
      }
    }

    console.log(`\n✅ Done. Total notifications updated: ${updatedCount}`)
  } catch (error) {
    console.error('❗ Error:', error)
  } finally {
    await client.close()
  }
}

updateFormFilledOn()
