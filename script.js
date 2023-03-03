const cryptocurrencies = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "BNB", name: "Binance Coin" },
    { symbol: "XRP", name: "XRP" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "DOT", name: "Polkadot" },
    { symbol: "DOGE", name: "Dogecoin" },
    { symbol: "LINK", name: "Chainlink" },
    { symbol: "BCH", name: "Bitcoin Cash" },
  ];
  
  const currencyRates = {
    usd: 1,
    gbp: 1.39,
  };
  
  const getPrice = async (symbol) => {
    const url = `https://api.coincap.io/v2/assets/${symbol}`;
    const response = await fetch(url);
    const data = await response.json();
    return parseFloat(data.data.priceUsd);
  };
  
  const updatePrice = async (symbol, currency) => {
    const price = await getPrice(symbol);
    const priceInCurrency = price * currencyRates[currency];
    const priceElement = document.getElementById(`${symbol.toLowerCase()}-price-${currency}`);
    priceElement.textContent = priceInCurrency.toFixed(2);
  };
  
  const updateAllPrices = async () => {
    for (let crypto of cryptocurrencies) {
      await updatePrice(crypto.symbol, "usd");
      await updatePrice(crypto.symbol, "gbp");
    }
  };
  
  const calculateResult = () => {
    const cryptocurrency = document.getElementById("cryptocurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const currency = document.getElementById("currency").value;
    const priceInCurrency = document.getElementById(`${cryptocurrency}-price-${currency}`).textContent;
    const result = amount / parseFloat(priceInCurrency);
    document.getElementById("result").textContent = `Result: ${result.toFixed(8)} ${cryptocurrency} = ${amount.toFixed(2)} ${currency.toUpperCase()}`;
  };
  
  const init = async () => {
    await updateAllPrices();
    calculateResult();
  };
  
  document.getElementById("cryptocurrency").addEventListener("change", calculateResult);
  document.getElementById("amount").addEventListener("input", calculateResult);
  document.getElementById("currency").addEventListener("change", calculateResult);
  
  init();
  