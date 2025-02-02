


export function spendingPerDay(transactions) {
    const result = {};

    for (const txn of transactions.transactions) {
        const { date, amount } = txn;
        if (result[date]) {
        result[date] += amount;
        } else {
        result[date] = amount;
        }
    }

    return Object.keys(result).map(date => ({ date, totalAmount: result[date] }));
}