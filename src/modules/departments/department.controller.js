const service = require('./department.service');

const create = async (req, res) => {
  try {
    const dept = await service.createDepartment(req.body.name);

    res.json({
      success: true,
      message: 'Department created',
      data: dept,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await service.getDepartments();

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { create, getAll };