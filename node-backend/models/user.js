const userSchema = {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  };
  
  const User = mongoose.model('User ', userSchema);
  
  module.exports = User;