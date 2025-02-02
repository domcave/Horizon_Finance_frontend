


export function spendingPerDay(transactions) {
    const result = {};

    for (const txn of transactions.transactions) {
        let { date, amount } = txn;
        amount = Math.abs(amount)
        date = new Date(date).toLocaleDateString();
        if (result[date]) {
        result[date] += amount;
        } else {
        result[date] = amount;
        }
    }

    return Object.keys(result).map(date => ({ date, totalAmount: result[date] }));
}


export function spendingPerCategory(transactions) {
    const result = {};

    for (const txn of transactions.transactions) {
        let { category, amount } = txn;
        amount = Math.abs(amount);
        if (result[category]) {
        result[category] += amount;
        } else {
        result[category] = amount;
        }
    }

    return Object.keys(result).map(category => ({ category, totalAmount: result[category] }));
}


export function accountBalances(accounts) {
    const result = {};

    for (const [id, acc] of Object.entries(accounts)) {
        let { name, balance } = acc;
        if (result[name]) {
        result[name] += balance;
        } else {
        result[name] = balance;
        }
    }

    return Object.keys(result).map(name => ({ name, totalbalance: result[name] }));
}