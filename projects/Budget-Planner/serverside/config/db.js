
import mongoose from "mongoose";
const DB_URI =
'mongodb+srv://Shikhar:shikhar2015@cluster0.6nqa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectToDb = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`Database connected with ${data.connection.host}`)
    );
};

export default connectToDb;
