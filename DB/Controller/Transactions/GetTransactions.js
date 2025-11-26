import { Transaction } from '../../Models/TransactionModel.js'

/**
 * Get all transactions (optional filters via query params)
 * GET /api/transactions
 * optional query: ?studentId=123 & limit=50 & skip=0 & fromDate=2025-01-01 & toDate=2025-12-31
 */
export const getAllTransactions = async (req, res) => {
  try {
    const {
      studentId,
      limit = 100,
      skip = 0,
      fromDate,
      toDate,
      category,
      mode,
    } = req.query

    const query = {}
    if (studentId) query.studentId = Number(studentId)
    if (category) query.category = category
    if (mode) query.mode = mode

    if (fromDate || toDate) {
      query.createdAt = {}
      if (fromDate) query.createdAt.$gte = new Date(fromDate)
      if (toDate) query.createdAt.$lte = new Date(toDate)
    }

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Math.min(Number(limit), 1000))

    return res.status(200).json({ count: transactions.length, transactions })
  } catch (err) {
    console.error('getAllTransactions error:', err)
    return res
      .status(500)
      .json({ message: 'Server error while fetching transactions' })
  }
}

/**
 * Get a single transaction by ID
 * GET /api/transactions/:id
 */
export const getTransaction = async (req, res) => {
  try {
    const { id } = req.query
    const tx = await Transaction.findById(id)
    if (!tx) return res.status(404).json({ message: 'Transaction not found' })
    return res.status(200).json({ transaction: tx })
  } catch (err) {
    console.error('getTransaction error:', err)
    return res
      .status(500)
      .json({ message: 'Server error while fetching transaction' })
  }
}
