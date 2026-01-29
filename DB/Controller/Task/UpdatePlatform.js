import TaskBoard from '../../Models/TaskBoard.js'

// ✅ Update posting status for Instagram-style tasks
export const updatePostingStatus = async (req, res) => {
  try {
    const { taskId } = req.query
    const { platform, status } = req.body // platform = 'LinkedIn'/'YouTube'/'TikTok', status = true/false

    if (!platform || typeof status !== 'boolean') {
      return res
        .status(400)
        .json({ message: 'Platform and status are required' })
    }

    const instagramTypes = [
      'PowerPulse Instagram Posts/Reels',
      'Global Grads Instagram Posts/Reels',
      'Octtoppus Instagram Posts/Reels',
    ]

    // Find the task
    const task = await TaskBoard.findById(taskId)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Only allow updating Posting for Instagram types
    if (!instagramTypes.includes(task.type)) {
      return res.status(400).json({
        message: 'Posting can only be updated for Instagram-style tasks',
      })
    }

    // Update the specific platform status
    let updated = false
    task.Posting = task.Posting.map((p) => {
      if (p.Name === platform) {
        updated = true
        return { ...p, Status: status }
      }
      return p
    })

    if (!updated) {
      return res
        .status(400)
        .json({ message: 'Platform not found in Posting array' })
    }

    await task.save()

    return res.status(200).json({
      message: `Posting status updated successfully for ${platform}`,
      task,
    })
  } catch (error) {
    console.error('Error updating posting status:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
