import mongoose from 'mongoose';

const recordSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, 'User cannot be empty.'],
  },
  expenses: {
    type: [
      {
        category: String,
        price: Number,
        date: Date,
        note: String,
      },
    ],
  },
  funds: {
    type: [
      {
        source: String,
        price: Number,
        date: Date,
        note: String,
      },
    ],
  },

  categories: {
    type: [
      {
        name: String,
      },
    ],
    unique: true,
  },
  sources: {
    type: [
      {
        name: String,
      },
    ],
    unique: true,
  },

  stock: [
    {
      symbol: {
        type: String,
        unique: true,
      },
      purchase: [
        {
          price: Number,
          numberOfShares: Number,
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model('Records', recordSchema);
