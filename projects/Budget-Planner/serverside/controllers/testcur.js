import axios from "axios";

export const currencyApi = (CURRENCY) =>
  axios.get(
    "https://freecurrencyapi.net/api/v2/latest?apikey=InO7CDDhJQ4aXsAndy1sCV8P8alaBSThHRqhQSF6&base_currency="+CURRENCY
  );
  currencyApi("USD").then(res => console.log(res.data.data.INR));