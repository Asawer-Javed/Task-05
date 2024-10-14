const categorySchema = {
    name: {
      type: String,
      required: true
    }
  };
  
  const Category = mongoose.model('Category', categorySchema);
  
  module.exports = Category;