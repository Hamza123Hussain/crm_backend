import TaskBoard from '../../Models/TaskBoard.js'
export const AddNote = async (req, res) => {
  const { taskId } = req.query
  const { description, addedBy } = req.body

  if (!description || !addedBy) {
    return res
      .status(400)
      .json({ message: 'Description and addedBy are required' })
  }

  try {
    // Create note object
    const note = {
      description,
      addedBy,
      createdAt: new Date(),
    }

    // Push note into task's notes array
    const updatedTask = await TaskBoard.findByIdAndUpdate(
      taskId,
      { $push: { notes: note } },
      { new: true },
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json({ message: 'Note added', task: updatedTask })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

export default router
