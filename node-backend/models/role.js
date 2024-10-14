const roleSchema = {
    name: {
      type: String,
      required: true
    }
  };
  
  const Role = mongoose.model('Role', roleSchema);
  
  module.exports = Role;