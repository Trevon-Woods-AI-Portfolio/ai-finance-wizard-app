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
    tickerCard1: {
      type: String,
      default: "",
    },
    tickerCard2: {
      type: String,
      default: "",
    },
    tickerCard3: {
      type: String,
      default: "",
    },
    tickerCard4: {
      type: String,
      default: "",
    },
    tickerCard5: {
      type: String,
      default: "",
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
