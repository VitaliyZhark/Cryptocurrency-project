const exchangeRatesTable = document.getElementById('exchangeRatesTable');
const currencySelect = document.getElementById('currency');
const amountInput = document.getElementById('amount');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');

const fetchExchangeRates = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=GBP,USD');
        const data = await response.json();

        for (const [key, value] of Object.entries(data)) {
            const row = exchangeRatesTable.insertRow();
            const currencyCell = row.insertCell();
            const gbpCell = row.insertCell();
            const usdCell = row.insertCell();

            currencyCell.innerHTML = key.toUpperCase();
            gbpCell.innerHTML = value.GBP.toFixed(2);
            usdCell.innerHTML = value.USD.toFixed(2);
        }
    } catch (error) {
        console.error(error);
    }
}

fetchExchangeRates();

const calculate = () => {
    const currency = currencySelect.value;
    const amount = amountInput.value;
    const operation = operationSelect.value;
    const usdRate = parseFloat(exchangeRatesTable.querySelector(`tr:nth-of-type(${getCurrencyRow(currency)}) td:nth-of-type(3)`).innerText);
    const cryptoRate = parseFloat(exchangeRatesTable.querySelector(`tr:nth-of-type(${getCurrencyRow(currency)}) td:nth-of-type(2)`).innerText);

    let result;

    if (operation === 'usdToCrypto') {
        result = (amount / usdRate).toFixed(6);
        resultDiv.innerHTML = `$${amount} is equivalent to ${result} ${currency.toUpperCase()} (at $${usdRate} per ${currency.toUpperCase()})`;
    } else if (operation === 'cryptoToUsd') {
        result = (amount * usdRate).toFixed(2);
        resultDiv.innerHTML = `${amount} ${currency.toUpperCase()} is equivalent to $${result} (at $${usdRate} per ${currency.toUpperCase()})`;
    }
}

calculateButton.addEventListener('click', calculate);

const getCurrencyRow = (currency) => {
    switch (currency) {
        case 'bitcoin':
            return 1;
        case 'ethereum':
            return 2;
        case 'dogecoin':
            return 3;
    }
}
