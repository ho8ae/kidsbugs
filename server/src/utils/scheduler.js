// src/utils/scheduler.js
const schedule = require('node-schedule');
const { PrismaClient } = require('@prisma/client');
const kakaoService = require('../services/kakaoService');

// Prisma 클라이언트 초기화
const prisma = new PrismaClient();

/**
 * 스케줄러 시작 - 서버 시작 시 호출
 */
function startScheduler() {
  console.log('스케줄러가 시작되었습니다. 매일 아침 8시에 질문이 전송됩니다.');
  
  // '0 8 * * *' -> 매일 아침 8시 (cron 표현식)
  const dailyJob = schedule.scheduleJob('0 8 * * *', async () => {
    try {
      console.log('오늘의 CS 면접 질문 전송을 시작합니다:', new Date());
      await sendDailyQuestion();
    } catch (error) {
      console.error('스케줄러 실행 오류:', error);
    }
  });
  
  return dailyJob;
}

/**
 * 오늘의 질문 전송
 */
async function sendDailyQuestion() {
  try {
    // 1. 랜덤 질문 선택
    const randomQuestion = await selectRandomQuestion();
    if (!randomQuestion) {
      console.error('전송할 질문을 찾을 수 없습니다.');
      return null;
    }
    
    // 2. DailyQuestion 생성
    const dailyQuestion = await prisma.dailyQuestion.create({
      data: {
        questionId: randomQuestion.id
      },
      include: {
        question: true
      }
    });
    
    // 3. 구독 중인 모든 사용자에게 메시지 전송
    const subscribers = await prisma.user.findMany({
      where: { isSubscribed: true }
    });
    
    console.log(`${subscribers.length}명의 사용자에게 질문 전송 시작`);
    
    // 옵션을 배열로 변환
    const options = randomQuestion.options;
    
    for (const user of subscribers) {
      try {
        // 질문 옵션을 텍스트로 변환
        const optionsText = options
          .map((option, index) => `${index + 1}. ${option}`)
          .join('\n');
        
        // 카카오톡 메시지 구성
        const messageTemplate = {
          object_type: 'text',
          text: `[오늘의 CS 면접 질문]\n\n${randomQuestion.text}\n\n${optionsText}\n\n답변은 번호로 입력해주세요 (예: 1)`,
          link: {
            web_url: process.env.SERVICE_URL || 'https://your-service.com',
            mobile_web_url: process.env.SERVICE_URL || 'https://your-service.com'
          },
          buttons: [
            {
              title: '개발자에게 커피 보내기 ☕',
              link: {
                web_url: `${process.env.SERVICE_URL}/donation?userId=${user.kakaoId}`,
                mobile_web_url: `${process.env.SERVICE_URL}/donation?userId=${user.kakaoId}`
              }
            }
          ]
        };
        
        // 메시지 전송
        await kakaoService.sendMessage(user.kakaoId, messageTemplate);
        console.log(`사용자 ${user.kakaoId}에게 메시지 전송 완료`);
      } catch (error) {
        console.error(`사용자 ${user.kakaoId}에게 메시지 전송 실패:`, error);
      }
    }
    
    console.log('오늘의 질문 전송 완료');
    return dailyQuestion;
  } catch (error) {
    console.error('질문 전송 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 랜덤 질문 선택
 */
async function selectRandomQuestion() {
  // 활성화된 질문 수 확인
  const count = await prisma.question.count({
    where: { active: true }
  });
  
  if (count === 0) {
    return null;
  }
  
  // 랜덤 스킵 값 계산
  const randomSkip = Math.floor(Math.random() * count);
  
  // 랜덤 질문 가져오기
  return prisma.question.findFirst({
    where: { active: true },
    skip: randomSkip
  });
}

/**
 * 특정 질문 수동 전송 (관리자 API용)
 */
async function sendSpecificQuestion(questionId) {
  try {
    // 질문 존재 여부 확인
    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });
    
    if (!question) {
      throw new Error('질문을 찾을 수 없습니다.');
    }
    
    // DailyQuestion 생성
    const dailyQuestion = await prisma.dailyQuestion.create({
      data: {
        questionId: question.id
      },
      include: {
        question: true
      }
    });
    
    // 사용자들에게 메시지 전송 (위의 sendDailyQuestion 함수와 유사)
    // ...생략
    
    return dailyQuestion;
  } catch (error) {
    console.error('수동 질문 전송 중 오류 발생:', error);
    throw error;
  }
}

module.exports = {
  startScheduler,
  sendDailyQuestion,
  sendSpecificQuestion
};