import mongoose from 'mongoose';

const guestbookSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 모델이 이미 존재하는 경우 재사용, 없는 경우 새로 생성
export default mongoose.models.Guestbook || mongoose.model('Guestbook', guestbookSchema); 