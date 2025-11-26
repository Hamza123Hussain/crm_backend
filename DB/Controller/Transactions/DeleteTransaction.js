import { Transaction } from '../../Models/TransactionModel.js'

/**
 * Delete a transaction by ID
 * DELETE /api/transactions/:id
 */
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.query
    const deleted = await Transaction.findByIdAndDelete(id)
    if (!deleted)
      return res.status(404).json({ message: 'Transaction not found' })
    return res
      .status(200)
      .json({ message: 'Transaction deleted', transaction: deleted })
  } catch (err) {
    console.error('deleteTransaction error:', err)
    return res
      .status(500)
      .json({ message: 'Server error while deleting transaction' })
  }
}
