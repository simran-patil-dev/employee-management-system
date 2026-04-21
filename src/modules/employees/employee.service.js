const prisma = require('../../shared/lib/prisma');
const { hashPassword } = require('../../shared/helpers/hashPassword');

// CREATE
const createEmployee = async (data) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) throw new Error('User already exists');

  // ✅ Validate department
  if (data.departmentId) {
    const dept = await prisma.department.findUnique({
      where: { id: data.departmentId },
    });

    if (!dept) throw new Error('Invalid departmentId');
  }

  const hashedPassword = await hashPassword(data.password);

 return prisma.user.create({
  data: {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || 'EMPLOYEE',
    departmentId: data.departmentId || null,
    position: data.position,
    salary: data.salary,
    phone: data.phone || null,           // ✅ add
    address: data.address || null,       // ✅ add
    joiningDate: data.joiningDate ? new Date(data.joiningDate) : null, // ✅ add
  },
});
};

// GET ALL
const getAllEmployees = async (user) => {
  if (user.role === 'HR') {
    return prisma.user.findMany({
      where: {
        role: 'EMPLOYEE',
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: {
          select: { name: true },
        },
        position: true,
        salary: true,
      },
    });
  }

  return prisma.user.findMany({
    where: { deletedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      status: true,
      department: {
        select: { name: true },
      },
      createdAt: true,
    },
  });
};

// GET ONE
const getEmployeeById = async (id, user) => {
  if (user.role === 'EMPLOYEE' && user.id !== id) {
    throw new Error('Access denied');
  }

  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      status: true,
      department: {
        select: { name: true },
      },
      createdAt: true,
    },
  });
};

// UPDATE
const updateEmployee = async (id, data, user) => {
  if (user.role === 'EMPLOYEE') {
    if (user.id !== id) throw new Error('Access denied');

    data = {
      phone: data.phone,
      address: data.address,
    };
  }

  // ✅ Validate department if updating
  if (data.departmentId) {
    const dept = await prisma.department.findUnique({
      where: { id: data.departmentId },
    });

    if (!dept) throw new Error('Invalid departmentId');
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

// DELETE
const deleteEmployee = async (id, user) => {
  if (user.role === 'HR') {
    return prisma.user.update({
      where: { id },
      data: {
        status: 'INACTIVE',
        deletedAt: new Date(),
      },
    });
  }

  return prisma.user.delete({
    where: { id },
  });
};

const updateSalary = async (id, data) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error('User not found');

  let newSalary = user.salary || 0;

  if (data.increment) newSalary += data.increment;
  if (data.decrement) newSalary -= data.decrement;
  if (data.bonus) newSalary += data.bonus;

  return prisma.user.update({
    where: { id },
    data: { salary: newSalary },
  });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateSalary,
  
};