// server/src/services/notificationService.js
const { db } = require('../lib/prisma');

async function getUserNotifications(userId) {
  const notifications = await db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    unreadCount,
    notifications
  };
}

async function markNotificationAsRead(userId, notifId) {
  const updated = await db.notification.update({
    where: { id: notifId },
    data: { read: true }
  });
  return updated;
}

async function markAllAsRead(userId) {
  await db.notification.updateMany({
    where: { userId },
    data: { read: true }
  });
  return { success: true };
}

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
  markAllAsRead
};
