import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tickerCards: {
    type: Object,
    default: {
      tickerCard1: "",
      tickerCard2: "",
      tickerCard3: "",
      tickerCard4: "",
      tickerCard5: "",
    },
  },
  watchlist: {
    type: [String],
    default: [],
  },
  analysis: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
