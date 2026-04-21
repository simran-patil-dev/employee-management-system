const service = require('./leave.service');

exports.applyLeave = async (req, res, next) => {
  try {
    const data = await service.applyLeave(req.user.id, req.body);

    res.json({
      success: true,
      message: 'Leave applied successfully',
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllLeaves = async (req, res, next) => {
  try {
    const data = await service.getAllLeaves();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const data = await service.updateStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );

    res.json({
      success: true,
      message: 'Leave updated',
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const data = await service.getMyLeaves(req.user.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};