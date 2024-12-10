// Utility function to extract entities (e.g., name or status) from the user's message
export function extractEntityFromMessage(message, entityType) {
  // Use simple string parsing or regex to extract entities based on context
  // Example: If the entityType is 'name', extract the student's name from the message
  if (entityType === 'name') {
    // Assuming the name is enclosed in quotes, extract it using regex
    const nameMatch = message.match(/status of student\s+"([^"]+)"/i)
    return nameMatch ? nameMatch[1] : null
  } else if (entityType === 'status') {
    // Assuming the status is enclosed in quotes, extract it using regex
    const statusMatch = message.match(/students with status\s+"([^"]+)"/i)
    return statusMatch ? statusMatch[1] : null
  }

  // Return null if no match is found
  return null
}
