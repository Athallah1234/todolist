import mongoose, { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['todo', 'completed'],
    default: 'todo',
  },
  category: {
    type: String,
    default: 'General',
  },
  deadline: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;
