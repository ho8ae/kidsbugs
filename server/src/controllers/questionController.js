// src/controllers/questionController.js

/**
 * 모든 질문 조회
 */
const getAllQuestions = async (req, res, next) => {
    try {
      const { category, difficulty, active } = req.query;
      
      // 필터 객체 생성
      const filter = {};
      
      if (category) filter.category = category;
      if (difficulty) filter.difficulty = difficulty;
      if (active !== undefined) filter.active = active === 'true';
      
      // 질문 조회
      const questions = await req.prisma.question.findMany({
        where: filter,
        orderBy: { id: 'desc' }
      });
      
      res.json({ success: true, data: questions });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 단일 질문 조회
   */
  const getQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const question = await req.prisma.question.findUnique({
        where: { id: Number(id) }
      });
      
      if (!question) {
        return res.status(404).json({ 
          success: false, 
          message: '질문을 찾을 수 없습니다' 
        });
      }
      
      res.json({ success: true, data: question });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 질문 생성
   */
  const createQuestion = async (req, res, next) => {
    try {
      const { text, options, correctOption, explanation, category, difficulty } = req.body;
      
      // 필수 필드 검증
      if (!text || !options || correctOption === undefined || !explanation || !category) {
        return res.status(400).json({
          success: false,
          message: '필수 필드가 누락되었습니다'
        });
      }
      
      // 옵션 형식 검증
      if (!Array.isArray(options) || options.length < 2) {
        return res.status(400).json({
          success: false,
          message: '최소 2개 이상의 옵션이 필요합니다'
        });
      }
      
      // correctOption 검증
      if (correctOption < 0 || correctOption >= options.length) {
        return res.status(400).json({
          success: false,
          message: '유효한 correctOption이 필요합니다'
        });
      }
      
      // 질문 생성
      const newQuestion = await req.prisma.question.create({
        data: {
          text,
          options,
          correctOption,
          explanation,
          category,
          difficulty: difficulty || 'medium',
          active: true
        }
      });
      
      res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 질문 수정
   */
  const updateQuestion = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { text, options, correctOption, explanation, category, difficulty, active } = req.body;
      
      // 기존 질문 확인
      const question = await req.prisma.question.findUnique({
        where: { id: Number(id) }
      });
      
      if (!question) {
        return res.status(404).json({ 
          success: false, 
          message: '질문을 찾을 수 없습니다' 
        });
      }
      
      // 업데이트 데이터 객체
      const updateData = {};
      
      if (text !== undefined) updateData.text = text;
      if (explanation !== undefined) updateData.explanation = explanation;
      if (category !== undefined) updateData.category = category;
      if (difficulty !== undefined) updateData.difficulty = difficulty;
      if (active !== undefined) updateData.active = active;
      
      // 옵션 업데이트 관련 검증
      if (options !== undefined) {
        if (!Array.isArray(options) || options.length < 2) {
          return res.status(400).json({
            success: false,
            message: '최소 2개 이상의 옵션이 필요합니다'
          });
        }
        updateData.options = options;
      }
      
      // correctOption 업데이트 관련 검증
      if (correctOption !== undefined) {
        const optionsToCheck = options || question.options;
        if (correctOption < 0 || correctOption >= optionsToCheck.length) {
          return res.status(400).json({
            success: false,
            message: '유효한 correctOption이 필요합니다'
          });
        }
        updateData.correctOption = correctOption;
      }
      
      // 질문 업데이트
      const updatedQuestion = await req.prisma.question.update({
        where: { id: Number(id) },
        data: updateData
      });
      
      res.json({ success: true, data: updatedQuestion });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 질문 삭제
   */
  const deleteQuestion = async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // 질문이 DailyQuestion에서 사용되는지 확인
      const dailyQuestion = await req.prisma.dailyQuestion.findFirst({
        where: { questionId: Number(id) }
      });
      
      if (dailyQuestion) {
        // 이미 사용된 질문은 비활성화만 진행
        const updatedQuestion = await req.prisma.question.update({
          where: { id: Number(id) },
          data: { active: false }
        });
        
        return res.json({
          success: true,
          data: updatedQuestion,
          message: '이미 사용된 질문이므로 비활성화 처리되었습니다'
        });
      }
      
      // 사용되지 않은 질문은 완전 삭제
      await req.prisma.question.delete({
        where: { id: Number(id) }
      });
      
      res.json({
        success: true,
        message: '질문이 성공적으로 삭제되었습니다'
      });
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * 오늘의 질문 조회
   */
  const getTodayQuestion = async (req, res, next) => {
    try {
      // 가장 최근 발송된 질문 조회
      const todayQuestion = await req.prisma.dailyQuestion.findFirst({
        orderBy: { sentDate: 'desc' },
        include: { question: true }
      });
      
      if (!todayQuestion) {
        return res.status(404).json({
          success: false,
          message: '오늘의 질문이 없습니다'
        });
      }
      
      res.json({ success: true, data: todayQuestion });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getTodayQuestion
  };