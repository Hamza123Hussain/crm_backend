import { Student } from '../../../Models/Student.js'

export const AddOptionDetails = async (req, res) => {
  try {
    const { studentId } = req.query // Extract studentId from query parameters
    const {
      optionName,
      I20_CAS_Recieved,
      optionspresented,
      optionspresentedDate,
      MOIOptions,
      FeedBack,
      WithinBudget,
      OptionsFinalized,
    } = req.body

    // Check if student exists
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Initialize OptionDetails object if not present
    if (!student.OptionDetails) {
      student.OptionDetails = {
        options: [],
        optionspresented: false,
        optionspresentedDate: null,
        MOIOptions: false,
        FeedBack: '',
        WithinBudget: false,
        OptionsFinalized: false,
      }
    }

    // Create a new option record
    const newOption = {
      optionName: optionName || '',
      'I20/CAS Recieved': I20_CAS_Recieved || false,
    }

    // Add the new option record
    student.OptionDetails.options.push(newOption)

    // Update other fields if provided
    if (optionspresented !== undefined)
      student.OptionDetails.optionspresented = optionspresented
    if (optionspresentedDate !== undefined)
      student.OptionDetails.optionspresentedDate = optionspresentedDate
    if (MOIOptions !== undefined) student.OptionDetails.MOIOptions = MOIOptions
    if (FeedBack !== undefined) student.OptionDetails.FeedBack = FeedBack
    if (WithinBudget !== undefined)
      student.OptionDetails.WithinBudget = WithinBudget
    if (OptionsFinalized !== undefined)
      student.OptionDetails.OptionsFinalized = OptionsFinalized

    student.markModified('OptionDetails') // Mark object as modified
    await student.save()

    return res.status(201).json({
      message: 'Option record added successfully',
      OptionDetails: student.OptionDetails,
    })
  } catch (error) {
    console.error('Error adding option details:', error)
    return res.status(500).json({ message: 'Server error. Please try again.' })
  }
}
