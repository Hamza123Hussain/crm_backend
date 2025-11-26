import { Router } from 'express'
import { addTransaction } from '../Controller/Transactions/AddTransaction.js'
import { deleteTransaction } from '../Controller/Transactions/DeleteTransaction.js'
import { updateTransaction } from '../Controller/Transactions/EditTransaction.js'
import {
  getAllTransactions,
  getTransaction,
} from '../Controller/Transactions/GetTransactions.js'

export const TransactionRouter = Router()
TransactionRouter.post('/AddTransaction', addTransaction)
TransactionRouter.delete('/DeleteTransaction', deleteTransaction)
TransactionRouter.put('/EditTransaction', updateTransaction)
TransactionRouter.get('/GetTransactions', getAllTransactions)
TransactionRouter.get('/GetTransactionById', getTransaction)
