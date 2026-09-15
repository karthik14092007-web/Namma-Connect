// server/src/middleware/auth.js
// Authentication, RBAC, and Resource Ownership Authorization Middleware

const { verifyAccessToken } = require('../utils/jwt');
const { error } = require('../utils/apiResponse');
const { db } = require('../lib/prisma');

/**
 * Authentication check: verifies JWT Bearer Access Token
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'Authentication required: missing or invalid authorization header', 'UNAUTHORIZED', 401);
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return error(res, 'Session expired or invalid access token. Please re-authenticate.', 'TOKEN_EXPIRED_OR_INVALID', 401);
  }

  req.user = {
    userId: payload.userId,
    role: payload.role,
    email: payload.email
  };

  next();
}

/**
 * RBAC Role check: verifies req.user.role matches allowed roles
 * e.g. requireRole('ADMIN') or requireRole('FOUNDER', 'ADMIN')
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Authentication required', 'UNAUTHORIZED', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return error(
        res,
        `Access forbidden: requires one of [${allowedRoles.join(', ')}] roles`,
        'FORBIDDEN_ROLE',
        403
      );
    }

    next();
  };
}

/**
 * Resource Ownership Verification:
 * Guarantees a user can only access/modify resources they own.
 * Admins are permitted universal access.
 */
function requireOwnership(entityType, paramName = 'id') {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return error(res, 'Authentication required', 'UNAUTHORIZED', 401);
      }

      // Admins bypass ownership checks
      if (req.user.role === 'ADMIN') {
        return next();
      }

      const resourceId = req.params[paramName];
      if (!resourceId) {
        return error(res, `Missing resource identifier parameter :${paramName}`, 'BAD_REQUEST', 400);
      }

      const currentUserId = req.user.userId;

      if (entityType === 'business') {
        const biz = await db.business.findUnique({ where: { id: resourceId } });
        if (!biz) return error(res, 'Business not found', 'NOT_FOUND', 404);
        if (biz.founderId !== currentUserId) {
          return error(res, 'Forbidden: You do not own this business', 'OWNERSHIP_REQUIRED', 403);
        }
        req.business = biz;
      } else if (entityType === 'diagnostic') {
        const diag = await db.diagnosticAssessment.findUnique({ where: { id: resourceId } });
        if (!diag) return error(res, 'Diagnostic assessment not found', 'NOT_FOUND', 404);
        const biz = await db.business.findUnique({ where: { id: diag.businessId } });
        if (!biz || biz.founderId !== currentUserId) {
          return error(res, 'Forbidden: You do not own this diagnostic assessment', 'OWNERSHIP_REQUIRED', 403);
        }
        req.diagnostic = diag;
      } else if (entityType === 'growthPlan') {
        const plan = await db.growthPlan.findFirst({ where: { id: resourceId } });
        if (!plan) return error(res, 'Growth plan not found', 'NOT_FOUND', 404);
        const biz = await db.business.findUnique({ where: { id: plan.businessId } });
        if (!biz || biz.founderId !== currentUserId) {
          return error(res, 'Forbidden: You do not own this growth plan', 'OWNERSHIP_REQUIRED', 403);
        }
        req.growthPlan = plan;
      } else if (entityType === 'campaign') {
        const camp = await db.campaign.findUnique({ where: { id: resourceId } });
        if (!camp) return error(res, 'Campaign not found', 'NOT_FOUND', 404);
        if (camp.founderId !== currentUserId) {
          return error(res, 'Forbidden: You do not own this campaign', 'OWNERSHIP_REQUIRED', 403);
        }
        req.campaign = camp;
      } else if (entityType === 'notification') {
        const notif = memoryStore?.notifications?.find(n => n.id === resourceId);
        if (notif && notif.userId !== currentUserId) {
          return error(res, 'Forbidden: You cannot modify another user\'s notification', 'OWNERSHIP_REQUIRED', 403);
        }
      }

      next();
    } catch (err) {
      console.error('[requireOwnership] Error checking ownership:', err);
      return error(res, 'Authorization error during ownership verification', 'INTERNAL_ERROR', 500);
    }
  };
}

module.exports = {
  requireAuth,
  requireRole,
  requireOwnership
};
