// src/controllers/adminController.js

/**
 * 모든 사용자 조회
 */
const getAllUsers = async (req, res, next) => {
    try {
      const users = await req.prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 응답 통계 조회
   */
  const getResponseStats = async (req, res, next) => {
    try {
      // 전체 응답 수
      const totalResponses = await req.prisma.response.count();
      
      // 정답 응답 수
      const correctResponses = await req.prisma.response.count({
        where: { isCorrect: true }
      });
      
      // 오답 응답 수
      const incorrectResponses = totalResponses - correctResponses;
      
      // 정답률
      const correctRate = totalResponses > 0 
        ? (correctResponses / totalResponses * 100).toFixed(2) 
        : 0;
      
      // 최근 7일간 일별 응답 수
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const dailyResponses = await req.prisma.$queryRaw`
        SELECT DATE(r."respondedAt") as date, COUNT(*) as count
        FROM "Response" r
        WHERE r."respondedAt" >= ${sevenDaysAgo}
        GROUP BY DATE(r."respondedAt")
        ORDER BY date ASC
      `;
      
      // 카테고리별 통계
      const categoryStats = await req.prisma.$queryRaw`
        SELECT q.category, COUNT(*) as total, 
          SUM(CASE WHEN r."isCorrect" = true THEN 1 ELSE 0 END) as correct
        FROM "Response" r
        JOIN "DailyQuestion" dq ON r."dailyQuestionId" = dq.id
        JOIN "Question" q ON dq."questionId" = q.id
        GROUP BY q.category
      `;
      
      res.json({
        success: true,
        data: {
          totalResponses,
          correctResponses,
          incorrectResponses,
          correctRate,
          dailyResponses,
          categoryStats
        }
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 기부 통계 조회
   */
  const getDonationStats = async (req, res, next) => {
    try {
      // 전체 기부 수
      const totalDonations = await req.prisma.donation.count({
        where: { status: 'approved' }
      });
      
      // 총 기부 금액
      const totalAmount = await req.prisma.donation.aggregate({
        where: { status: 'approved' },
        _sum: { amount: true }
      });
      
      // 최근 5개 기부 내역
      const recentDonations = await req.prisma.donation.findMany({
        where: { status: 'approved' },
        include: { user: true },
        orderBy: { approvedAt: 'desc' },
        take: 5
      });
      
      // 월별 기부 통계
      const monthlyStats = await req.prisma.$queryRaw`
        SELECT 
          EXTRACT(YEAR FROM d."approvedAt") as year,
          EXTRACT(MONTH FROM d."approvedAt") as month,
          COUNT(*) as count,
          SUM(d.amount) as total
        FROM "Donation" d
        WHERE d.status = 'approved'
        GROUP BY year, month
        ORDER BY year DESC, month DESC
      `;
      
      res.json({
        success: true,
        data: {
          totalDonations,
          totalAmount: totalAmount._sum.amount || 0,
          recentDonations,
          monthlyStats
        }
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 질문 전송 (수동)
   */
  const sendQuestion = async (req, res, next) => {
    try {
      const { questionId } = req.body;
      
      if (!questionId) {
        return res.status(400).json({
          success: false,
          message: '질문 ID가 필요합니다'
        });
      }
      
      // 질문 존재 확인
      const question = await req.prisma.question.findUnique({
        where: { id: parseInt(questionId) }
      });
      
      if (!question) {
        return res.status(404).json({
          success: false,
          message: '질문을 찾을 수 없습니다'
        });
      }
      
      // DailyQuestion 생성
      const dailyQuestion = await req.prisma.dailyQuestion.create({
        data: {
          questionId: question.id
        },
        include: {
          question: true
        }
      });
      
      // 구독자들에게 전송 (실제 전송 로직은 스케줄러에 있음)
      // 여기서는 생성만 진행하고 성공 응답
      
      res.json({
        success: true,
        message: '질문이 성공적으로 생성되었습니다',
        data: dailyQuestion
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getAllUsers,
    getResponseStats,
    getDonationStats,
    sendQuestion
  };