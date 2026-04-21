const service = require('./employee.service');

const create = async (req, res) => {
  try {
    const user = await service.createEmployee(req.body);
    res.json({ success: true, message: 'Employee created', data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await service.getAllEmployees(req.user);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await service.getEmployeeById(req.params.id, req.user);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await service.updateEmployee(
      req.params.id,
      req.body,
      req.user
    );
    res.json({ success: true, message: 'Updated', data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteEmployee(req.params.id, req.user);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const data = await service.getMyLeaves(req.user.id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteLeave = async (req, res, next) => {
  try {
    const data = await service.deleteLeave(req.params.id, req.user.id);

    res.json({
      success: true,
      message: 'Leave deleted',
      data,
    });
  } catch (err) {
    next(err);
  }
};



const updateSalary = async (req, res, next) => {
  try {
    const data = await service.updateSalary(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Salary updated',
      data,
    });
  } catch (err) {
    next(err);
  }
};



module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateSalary,
  
};