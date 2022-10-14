// model imports
import RecordModel from '../models/record.js';
import _ from 'lodash';
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// -> controllers
import axios from 'axios';

export const fetchsymbls = async (stock, iexApiToken) => {
  const res = await fetch(
    `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stock}&filter=latestPrice&types=quote&token=${iexApiToken}`
  );
  const data = await res.text();
  console.log(res);
  if (res.status == 200) {
    return res;
  }
  return null;
};
export const getCurrentprice = async (req, res) => {
  let stockprice = class {
    constructor(name, currentprice, purchaseprice) {
      this['name'] = name;
      this.currentprice = currentprice;
      this.purchaseprice = purchaseprice;
    }
  };
  const arr = [];
  const user = await RecordModel.findOne({ user: req.user.id });

  try {
    for (let i = 0; i < user.stock.length; i++) {
      let symbol = user.stock[i].symbol;
      const iexApiToken = 'pk_6fa1ccc6513640abb6257fc93550e73b';
      const stockPriceRes = await fetch(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&filter=latestPrice&types=quote&token=${iexApiToken}`
      );
      let stockPriceData = null;
      try {
        stockPriceData = await stockPriceRes.json();
      } catch (e) {
        continue;
      }
      console.log('stockPriceData', stockPriceData);
      if (!stockPriceData) continue;
      let currencyRate = 77.5;
      let purchaseprice = user.stock[i].purchase;
      const num = stockPriceData?.[symbol]?.quote?.latestPrice * currencyRate;

      let stockpriceobj = new stockprice(symbol, num, purchaseprice);
      arr[i] = stockpriceobj;
    }
    return res.json(arr);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 400,
      message: err,
    });
  }
};

export const newRecord = async (req, res) => {
  // req seperation
  const { user } = req.body;
  try {
    // check if req is empty
    if (!user) return res.status(400).json({ msg: 'Please fill in all fields.' });
    const newRecord = new RecordModel({
      user: user,
    });
    await newRecord.save();
    return res.json({
      msg: 'Record table successfully added!',
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const addToRecord = async (req, res) => {
  const userID = req.user.id;
  // req seperation
  const { expenses, funds, categories, sources } = req.body;
  try {
    // check if req is empty
    if (!userID) return res.status(400).json({ msg: 'Please fill in all fields.' });
    // check if record exist
    const record = await RecordModel.findOne({ user: userID });
    if (record) {
      await RecordModel.findOneAndUpdate(
        { user: userID },
        {
          $push: {
            expenses,
            funds,
            categories,
            sources,
          },
        },
        { new: true }
      );
      return res.json({ msg: 'Update successfully.' });
    } else {
      return res.status(400).json({ msg: 'This record does not exist.' });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const fetchData = async (req, res) => {
  try {
    const id = req.user.id;
    if (id) {
      const data = await RecordModel.findOne({ user: id });
      if (data) {
        return res.status(200).json({ msg: data });
      } else {
        return res.status(400).json({ msg: 'This doesnt exist!' });
      }
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const fetchsymbols = async (req, res) => {
  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.params.symbols}&filter=symbol,companyName,latestPrice,latestUpdate,previousClose,lastTradeTime&types=quote&token=pk_6fa1ccc6513640abb6257fc93550e73b`
    )
    .then((stocks) => res.json(stocks.data))
    .catch((err) => res.status(err.response.status).json({ noStocksFound: err.response.data }));
};

export const lookup = async (req, res) => {
  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${req.params.symbols}/quote?filter=symbol,companyName,latestPrice,latestUpdate,previousClose,lastTradeTime&token=pk_6fa1ccc6513640abb6257fc93550e73b`
    )

    .then((stock) => res.json(stock.data))
    .catch((err) =>
      res.status(err.response.status).json({ noStockFound: err.response.data, symbol: req.params.symbol.toUpperCase() })
    );
};

export const getStocks = async (req, res) => {
  const Stocks = await RecordModel.findOne({ userID: req.user.id });
  res.status(200).json({
    status: 200,
    data: Stocks.stock,
  });
};

export const deleteStocks = async (req, res) => {
  const { symbol, date, purchase } = req.body;
  try {
    let user = await RecordModel.findById(req.user._id);

    for (let i = 0; i < user.stock.pricelength; i++) {
      if (user.stock[i].symbol.toString() === symbol && user.stock[i].purchase.price === purchase.price) {
        await stock.remove();
      }
    }

    res.status(200).json({
      status: 200,
      data: stock,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 400,
      message: err,
    });
  }
};

export const Addtostock = async (req, res) => {
  const { symbol, purchaseprice, numberofshares, date } = req.body;

  try {
    let p = 4;
    const userID = req.user.id;
    const purchase = { price: purchaseprice, numberOfShares: numberofshares };
    let user = await RecordModel.findOne({ user: userID });
    let data;
    if (!fetchsymbls(symbol, 'pk_6fa1ccc6513640abb6257fc93550e73b')) {
      return res.status(400).json({ message: err.message });
    }
    for (let i = 0; i < user.stock.length; i++) {
      if (symbol === user.stock[i].symbol) {
        console.log(purchase);
        const red = await RecordModel.findOneAndUpdate(
          { user: userID, 'stock.symbol': symbol },
          {
            $push: {
              'stock.$.purchase': purchase,
            },
          },
          { new: true }
        );
        p = -1;
        return res.status(200).json({ data: red });
      }
    }
    console.log(p);
    if (p > 0) {
      console.log(p);

      const stock = [{ symbol: symbol, purchase: [purchase], date: date }];
      data = await RecordModel.findOneAndUpdate(
        { user: userID },
        {
          $push: {
            stock,
          },
        },
        { new: true }
      );
      return res.status(200).json({ data });
    }

    return res.json({ msg: 'Update successfully.' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
