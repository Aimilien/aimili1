const apiUrl = 'https://open.er-api.com/v6/latest/USD';

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Erreur lors de la récupération des taux de change:', error);
        return null;
    }
}

async function populateCurrencyOptions() {
    const rates = await fetchExchangeRates();
    if (rates) {
        const currencySelects = document.querySelectorAll('select');
        const currencies = Object.keys(rates);
        currencySelects.forEach(select => {
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                select.appendChild(option);
            });
        });
    }
}

document.getElementById('convertButton').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const rates = await fetchExchangeRates();

    if (rates && !isNaN(amount) && rates[fromCurrency] && rates[toCurrency]) {
        const rate = rates[toCurrency] / rates[fromCurrency];
        const result = amount * rate;
        document.getElementById('result').textContent = `Résultat : ${result.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById('result').textContent = 'Conversion impossible.';
    }
});

populateCurrencyOptions();
