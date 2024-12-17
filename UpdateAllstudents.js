import DummyModel from './DB/Models/Dummy.js'

async function addStudentTagToAll() {
  try {
    // Update all documents to include the `studentTag` field with the default value 'NEW'
    const result = await DummyModel.updateMany(
      {}, // Empty filter object means "select all documents"
      { $set: { studentTag: 'NEW' } } // Set the `studentTag` field to 'NEW'
    )

    console.log(`${result.modifiedCount} documents updated.`)
  } catch (error) {
    console.error('Error updating documents:', error)
  }
}

// Call the function
addStudentTagToAll()
