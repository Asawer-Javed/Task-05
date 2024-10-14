const authenticate = async (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(401).send({ message: 'Invalid role' });
    }
    req.role = role;
    next();
  };
  
  module.exports = authenticate;