const prisma = require('../../shared/lib/prisma');

const createDepartment = async (name) => {
  return prisma.department.create({
    data: { name },
  });
};

const getDepartments = async () => {
  return prisma.department.findMany();
};

module.exports = { createDepartment, getDepartments };