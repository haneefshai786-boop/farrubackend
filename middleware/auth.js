const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (roles = []) => async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No authorization header' });
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    if (roles.length && !roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
