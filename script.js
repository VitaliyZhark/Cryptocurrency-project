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

        const bitcoinRow = exchangeRatesTable.insertRow();
        const bitcoinCell = bitcoinRow.insertCell();
        const bitcoinGbpCell = bitcoinRow.insertCell();
        const bitcoinUsdCell = bitcoinRow.insertCell();

        bitcoinCell.innerHTML = 'Bitcoin';
        bitcoinGbpCell.innerHTML = data.bitcoin.GBP.toFixed(2);
        bitcoinUsdCell.innerHTML = data.bitcoin.USD.toFixed(2);

        for (const [key, value] of Object.entries(data)) {
            if (key === 'bitcoin') {
                continue;
            }
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
    const usdRate = parseFloat(exchangeRatesTable.querySelector(`tr:nth-of-type(${currency === 'bitcoin' ? 2 : currency === 'ethereum' ? 3 : 4} ${currency !== 'bitcoin' ? '+ 1' : ''}) td:nth-of-type(3)`).innerHTML);
    const result = operation === 'usdToCrypto' ? (amount / usdRate).toFixed(8) : (amount * usdRate).toFixed(2);
    resultDiv.innerHTML = `Result: ${result} ${operation === 'usdToCrypto' ? currency.toUpperCase() : 'USD'}`;
}

calculateButton.addEventListener('click', calculate);
