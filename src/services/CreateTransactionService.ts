import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { TransactionType } from '../models/TransationType';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
