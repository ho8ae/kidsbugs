const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// 라우터 임포트 (나중에 생성 예정)
const questionRoutes = require('./routes/questionRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Prisma 클라이언트 초기화
const prisma = new PrismaClient();

// Express 앱 초기화
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// 정적 파일 서빙 (나중에 필요한 경우 활성화)
app.use(express.static(path.join(__dirname, '../public')));

// Prisma 클라이언트를 요청 객체에 추가
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// 라우트 설정
app.use('/api/questions', questionRoutes);
app.use('/webhook', webhookRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/admin', adminRoutes);

// 기본 경로
app.get('/', (req, res) => {
  res.json({ message: 'CS Interview Bot API is running' });
});

// 에러 핸들링 미들웨어
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(err);
  
  res.status(status).json({
    error: {
      message,
      status,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

module.exports = app;