// src/routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// 카카오톡 메시지 웹훅 처리
router.post('/message', webhookController.handleKakaoMessage);

module.exports = router;