export const formatGeminiResponse = (response) => {
  try {
    // Check if the response contains JSON data
    if (response && response.text && response.text.includes('```json')) {
      const jsonStartIndex = response.text.indexOf('```json') + 7
      const jsonEndIndex = response.text.indexOf('```', jsonStartIndex)
      const jsonString = response.text
        .substring(jsonStartIndex, jsonEndIndex)
        .trim()

      // Parse the JSON string
      const studentData = JSON.parse(jsonString)

      // Structure the formatted data
      const formattedData = {
        name: studentData.Name || 'N/A',
        email: studentData.Email || 'N/A',
        status: studentData.Status.join(', ') || 'N/A',
        notes: studentData.Notes || 'No Notes Available',
        preferredCountries: studentData.PreferredCountries.join(', ') || 'N/A',
        educationLevel: studentData.EducationLevel || 'Not Provided',
        budget: studentData.Budget || 'Not Provided',
        studentTag: studentData.StudentTag || 'N/A',
        attestedByForeignOffice: studentData.attestedByForeignOffice
          ? 'Yes'
          : 'No',
        attestedByHEC: studentData.attestedByHEC ? 'Yes' : 'No',
      }

      return formattedData
    } else {
      return { message: 'Invalid response format' }
    }
  } catch (error) {
    console.error('Error formatting Gemini response:', error)
    return { message: 'Error processing the response' }
  }
}
