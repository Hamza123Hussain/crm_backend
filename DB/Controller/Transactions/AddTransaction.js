// controllers/transactionsController.js

import { Transaction } from '../../Models/TransactionModel.js'

/**
 * Create a new transaction
 * POST /api/transactions
 */
export const addTransaction = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      mode,
      bankName,
      createdBy,
      currency,
      meta,
      type,
      country,
    } = req.body

    // basic validation
    if (amount === undefined || amount === null || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid or missing "amount"' })
    }
    if (!category) {
      return res.status(400).json({ message: 'Missing "category"' })
    }
    if (!mode) {
      return res.status(400).json({ message: 'Missing "mode"' })
    }

    const tx = new Transaction({
      type: type,
      amount: Number(amount),
      category,
      description: description || '',
      mode,
      bankName: bankName || '',
      createdBy: createdBy || null,
      meta: meta || {},
      country: country,
      currency,
    })

    const saved = await tx.save()
    return res
      .status(201)
      .json({ message: 'Transaction created', transaction: saved })
  } catch (err) {
    console.error('addTransaction error:', err)
    return res
      .status(500)
      .json({ message: 'Server error while creating transaction' })
  }
}
