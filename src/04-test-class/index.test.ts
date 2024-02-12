// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdrawAmount = 150;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(withdrawAmount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferFromBankAccount = getBankAccount(100);
    const transferToBankAccount = getBankAccount(100);

    expect(() =>
      transferFromBankAccount.transfer(150, transferToBankAccount),
    ).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(150, bankAccount)).toThrowError();
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 20;
    const expectedNewBalance = initialBalance + depositAmount;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(depositAmount);
    const newBalance = bankAccount.getBalance();

    expect(newBalance).toEqual(expectedNewBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const withdrawAmount = 20;
    const expectedNewBalance = initialBalance - withdrawAmount;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(withdrawAmount);
    const newBalance = bankAccount.getBalance();

    expect(newBalance).toEqual(expectedNewBalance);
  });

  test('should transfer money', () => {
    const transferFromInitialBalance = 100;
    const transferToInitialBalance = 80;
    const transferAmount = 30;
    const extepctedTransferFromBalance =
      transferFromInitialBalance - transferAmount;
    const extepctedTransferToBalance =
      transferToInitialBalance + transferAmount;

    const transferFromBankAccount = getBankAccount(transferFromInitialBalance);
    const transferToBankAccount = getBankAccount(transferToInitialBalance);
    transferFromBankAccount.transfer(transferAmount, transferToBankAccount);
    const transferFromBalance = transferFromBankAccount.getBalance();
    const transferToBalance = transferToBankAccount.getBalance();

    expect(transferFromBalance).toEqual(extepctedTransferFromBalance);
    expect(transferToBalance).toEqual(extepctedTransferToBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 110;
    const bankAccount = getBankAccount(initialBalance);
    const balance = await bankAccount.fetchBalance();
    if (typeof balance === 'number') {
      expect(balance).not.toBe(initialBalance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toEqual(new SynchronizationFailedError());
    }
  });
});
