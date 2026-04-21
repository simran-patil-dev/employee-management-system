const prisma = require('../../shared/lib/prisma');

const applyLeave = async (userId, data) => {
  return prisma.leaveRequest.create({
    data: {
      userId,
      type: data.type,
      fromDate: new Date(data.fromDate),
      toDate: new Date(data.toDate),
      reason: data.reason,
    },
  });
};

const getAllLeaves = async () => {
  return prisma.leaveRequest.findMany({
    include: {
      user: { select: { name: true, email: true } },
      reviewer: { select: { name: true } },
    },
  });
};

const updateStatus = async (leaveId, status, reviewerId) => {
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    throw new Error('Invalid status');
  }

  return prisma.leaveRequest.update({
    where: { id: leaveId },
    data: {
      status,
      reviewedBy: reviewerId,
    },
  });
};


const getMyLeaves = async (userId) => {
  return prisma.leaveRequest.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

module.exports = {
  applyLeave,
  getAllLeaves,
  updateStatus,
  getMyLeaves, // ✅ export it
};