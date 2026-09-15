// server/src/services/authService.js
const { db } = require('../lib/prisma');
const { hashPassword, comparePassword } = require('../utils/password');
const { signAccessToken, signRefreshToken, verifyRefreshToken, hashToken } = require('../utils/jwt');
const { logAudit } = require('./auditService');

async function registerUser({ email, password, firstName, lastName, role = 'FOUNDER' }, ipAddress) {
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    const error = new Error('An account with this email address already exists');
    error.statusCode = 409;
    error.code = 'EMAIL_ALREADY_EXISTS';
    throw error;
  }

  // Prevent self-registration as ADMIN
  const assignedRole = role === 'ADMIN' ? 'FOUNDER' : role;

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: assignedRole,
      isEmailVerified: false,
      isActive: true
    }
  });

  // Automatically seed founder profile for founder role
  if (assignedRole === 'FOUNDER') {
    await db.founderProfile.create({
      data: {
        userId: user.id,
        location: 'Tamil Nadu',
        state: 'Tamil Nadu',
        city: 'Chennai',
        preferredLanguage: 'English'
      }
    });
  }

  // Issue tokens
  const accessToken = signAccessToken(user);
  const { token: refreshToken, tokenHash, expiresAt } = signRefreshToken(user);

  await db.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  await logAudit({
    userId: user.id,
    action: 'REGISTER',
    entity: 'User',
    entityId: user.id,
    ipAddress
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    },
    accessToken,
    refreshToken
  };
}

async function loginUser({ email, password }, ipAddress) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await db.user.findUnique({ where: { email: normalizedEmail } });
  if (!user || !user.isActive) {
    const error = new Error('Invalid email address or password');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email address or password');
    error.statusCode = 401;
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  // Update last login
  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() }
  });

  const accessToken = signAccessToken(user);
  const { token: refreshToken, tokenHash, expiresAt } = signRefreshToken(user);

  await db.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt
    }
  });

  await logAudit({
    userId: user.id,
    action: 'LOGIN',
    entity: 'User',
    entityId: user.id,
    ipAddress
  });

  // Fetch associated profile and active business
  const profile = await db.founderProfile.findFirst({ where: { userId: user.id } });
  const business = await db.business.findFirst({ where: { founderId: user.id } });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      profile,
      business
    },
    accessToken,
    refreshToken
  };
}

async function refreshSession(refreshToken) {
  if (!refreshToken) {
    const error = new Error('Refresh token is required');
    error.statusCode = 401;
    error.code = 'REFRESH_TOKEN_REQUIRED';
    throw error;
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    const error = new Error('Invalid or expired refresh token');
    error.statusCode = 401;
    error.code = 'INVALID_REFRESH_TOKEN';
    throw error;
  }

  const currentTokenHash = hashToken(refreshToken);
  const storedToken = await db.refreshToken.findUnique({
    where: { tokenHash: currentTokenHash }
  });

  if (!storedToken || storedToken.revoked || new Date(storedToken.expiresAt) < new Date()) {
    const error = new Error('Refresh token revoked or expired');
    error.statusCode = 401;
    error.code = 'REVOKED_REFRESH_TOKEN';
    throw error;
  }

  // Rotate refresh token
  await db.refreshToken.update({
    where: { tokenHash: currentTokenHash },
    data: { revoked: true }
  });

  const user = await db.user.findUnique({ where: { id: payload.userId } });
  if (!user || !user.isActive) {
    const error = new Error('User account not active');
    error.statusCode = 401;
    throw error;
  }

  const newAccessToken = signAccessToken(user);
  const { token: newRefreshToken, tokenHash: newTokenHash, expiresAt } = signRefreshToken(user);

  await db.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt
    }
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
  };
}

async function logoutUser(userId, refreshToken, ipAddress) {
  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await db.refreshToken.update({
      where: { tokenHash },
      data: { revoked: true }
    });
  }

  await logAudit({
    userId,
    action: 'LOGOUT',
    entity: 'User',
    entityId: userId,
    ipAddress
  });

  return { success: true };
}

async function getCurrentUser(userId) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const profile = await db.founderProfile.findFirst({ where: { userId: user.id } });
  const businesses = await db.business.findMany({ where: { founderId: user.id } });

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    profile,
    businesses,
    activeBusiness: businesses[0] || null
  };
}

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
  getCurrentUser
};
