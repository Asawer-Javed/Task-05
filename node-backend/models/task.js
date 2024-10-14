const taskSchema = {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  };
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;