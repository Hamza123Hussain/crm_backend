import { Transaction } from '../../Models/TransactionModel.js'

/**
 * Update a transaction by ID
 * PUT /api/transactions/:id
 */
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.query
    const updateData = { ...req.body }

    // sanitize & type cast
    if (updateData.amount !== undefined)
      updateData.amount = Number(updateData.amount)
    if (updateData.studentId !== undefined)
      updateData.studentId = Number(updateData.studentId)

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
    if (!updated)
      return res.status(404).json({ message: 'Transaction not found' })

    return res
      .status(200)
      .json({ message: 'Transaction updated', transaction: updated })
  } catch (err) {
    console.error('updateTransaction error:', err)
    return res
      .status(500)
      .json({ message: 'Server error while updating transaction' })
  }
}
