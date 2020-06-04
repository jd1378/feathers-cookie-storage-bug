const userModel = require('../models/user.model');

module.exports = () => async (context) => {
  if (context.params.user) {
    await userModel.findOneAndUpdate(
      {
        _id: context.params.user._id,
      },
      {
        credUpdatedAt: Date.now(),
      }
    );
  }
};
