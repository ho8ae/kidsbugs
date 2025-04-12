require('dotenv').config();
const app = require('./src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

// 스케줄러를 나중에 구현하고 여기서 실행할 예정

async function startServer() {
  try {
    // 데이터베이스 연결 확인
    await prisma.$connect();
    console.log('데이터베이스 연결 성공');
    
    // 서버 시작
    app.listen(PORT,'0.0.0.0', () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
    });
  } catch (error) {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  }
}

// 서버 시작
startServer();

// 정상 종료 처리
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('데이터베이스 연결 종료');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('데이터베이스 연결 종료');
  process.exit(0);
});