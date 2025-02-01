// Spending Breakdown Doughnut Chart
const ctx1 = document.getElementById('spendingChart').getContext('2d');
const spendingChart = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Rent', 'Food', 'Utilities', 'Entertainment', 'Others'],
        datasets: [{
            label: 'Spending',
            data: [1200, 600, 300, 400, 500], // Example spending amounts
            backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#ffcd56',
                '#4bc0c0',
                '#9966ff'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Income vs. Expenses Bar Chart
const ctx2 = document.getElementById('incomeExpensesChart').getContext('2d');
const incomeExpensesChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Income',
                data: [1000, 1000, 1000, 1000], // Example weekly income
                backgroundColor: '#4caf50'
            },
            {
                label: 'Expenses',
                data: [600, 800, 900, 700], // Example weekly expenses
                backgroundColor: '#f44336'
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
