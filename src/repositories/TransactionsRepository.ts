import Transaction from '../models/Transaction';
import { TransactionType } from '../models/TransationType';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return {
      income: this.getIncomeValue(),
      outcome: this.getOutcomeValue(),
      total: this.getTotalTransationsValue(),
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    if (!['income', 'outcome'].some(o => o === type)) {
      throw Error(`O tipo da transação precisa ser 'income' ou 'outcome'.`);
    }

    const totalValue = this.getTotalTransationsValue();

    if (type === 'outcome' && value > totalValue) {
      throw Error(`O valor de saída não pode ser superior ao valor em caixa.`);
    }

    const transation = new Transaction({ title, type, value });

    this.transactions.push(transation);

    return transation;
  }

  private getIncomeTransations(): Transaction[] {
    return this.transactions.filter(t => t.type === 'income');
  }

  private getOutcomeTransations(): Transaction[] {
    return this.transactions.filter(t => t.type === 'outcome');
  }

  private getTransationsValue(transactions: Transaction[]): number {
    return transactions.reduce((acc, t) => acc + t.value, 0);
  }

  private getIncomeValue(): number {
    return this.getTransationsValue(this.getIncomeTransations());
  }

  private getOutcomeValue(): number {
    return this.getTransationsValue(this.getOutcomeTransations());
  }

  private getTotalTransationsValue(): number {
    return this.getIncomeValue() - this.getOutcomeValue();
  }
}

export default TransactionsRepository;
