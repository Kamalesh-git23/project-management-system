import prisma from "../config/prisma.js";

const auditLogger =
  async ({
    userId,
    projectId = null,
    action,
    details,
  }) => {
    await prisma.auditLog.create({
      data: {
        userId,
        projectId,
        action,
        details,
      },
    });
  };

export default auditLogger;