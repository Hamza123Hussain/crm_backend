export function calculateTaskCompletion(progress, priority) {
  if (progress === 'DONE') {
    return 100
  }

  if (progress === 'TODO') {
    return 0
  }

  if (progress === 'Minor_progress') {
    if (priority === 'HIGH') {
      return 100 - 55
    }
    if (priority === 'MEDIUM') {
      return 100 - 31
    }
    if (priority === 'LOW') {
      return 100 - 12
    }
  }

  if (progress === 'IN_PROGRESS') {
    if (priority === 'HIGH') {
      return 100 - 27
    }
    if (priority === 'MEDIUM') {
      return 100 - 19
    }
    if (priority === 'LOW') {
      return 100 - 9
    }
  }

  // Default case for unrecognized progress or priority
  return 0
}
