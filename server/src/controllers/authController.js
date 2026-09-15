// server/src/controllers/authController.js
const authService = require('../services/authService');
const { success, error } = require('../utils/apiResponse');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

async function register(req, res) {
  try {
    const result = await authService.registerUser(req.body, req.ip);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    return success(res, {
      user: result.user,
      accessToken: result.accessToken
    }, 201);
  } catch (err) {
    return error(res, err.message, err.code || 'REGISTRATION_FAILED', err.statusCode || 400);
  }
}

async function login(req, res) {
  try {
    const result = await authService.loginUser(req.body, req.ip);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    return success(res, {
      user: result.user,
      accessToken: result.accessToken
    }, 200);
  } catch (err) {
    return error(res, err.message, err.code || 'LOGIN_FAILED', err.statusCode || 401);
  }
}

async function refresh(req, res) {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const result = await authService.refreshSession(token);
    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    return success(res, {
      user: result.user,
      accessToken: result.accessToken
    }, 200);
  } catch (err) {
    return error(res, err.message, err.code || 'REFRESH_FAILED', err.statusCode || 401);
  }
}

async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const userId = req.user?.userId;
    await authService.logoutUser(userId, token, req.ip);
    res.clearCookie('refreshToken');
    return success(res, { message: 'Logged out successfully' }, 200);
  } catch (err) {
    return error(res, err.message, 'LOGOUT_FAILED', 500);
  }
}

async function me(req, res) {
  try {
    const user = await authService.getCurrentUser(req.user.userId);
    return success(res, { user }, 200);
  } catch (err) {
    return error(res, err.message, 'USER_FETCH_FAILED', err.statusCode || 404);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  me
};
