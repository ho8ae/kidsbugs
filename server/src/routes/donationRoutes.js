// src/routes/donationRoutes.js
const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

// 커피값 기부 요청 생성
router.post('/coffee', donationController.createDonation);

// 결제 성공 처리
router.get('/success', donationController.handlePaymentSuccess);

// 결제 취소 처리
router.get('/cancel', donationController.handlePaymentCancel);

// 결제 실패 처리
router.get('/fail', donationController.handlePaymentFail);

module.exports = router;