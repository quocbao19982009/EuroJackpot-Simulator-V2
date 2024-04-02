using API.DTOs;
using API.Entities;

public static class BalanceTransactionExtension
{
    public static TransactionDto ToDto(this BalanceTransaction transaction)
    {
        return new TransactionDto
        {
            Id = transaction.Id,
            Created = transaction.Created,
            Amount = transaction.Amount
        };
    }
}