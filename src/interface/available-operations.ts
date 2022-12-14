type ATM = "Deposit Money" | "Balance" | "Funds Transfer" | "Withdraw" | "Fast Cash" | "Show Account Details" | "Exit";

export default interface ATMOperations {
  operation: ATM;
  amount?: number;
  totalAmount?: number;
}