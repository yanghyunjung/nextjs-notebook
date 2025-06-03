import mongoose from 'mongoose';

const guestbookMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.GuestbookMessage || mongoose.model('GuestbookMessage', guestbookMessageSchema); 