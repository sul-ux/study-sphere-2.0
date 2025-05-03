import { GoogleGenerativeAI } from "@google/generative-ai";

// API key configuration
const API_KEY = "AIzaSyDsQ3Os2x3IPnBDlngIJCaImeWLdw4ykZc"; 
const genAI = new GoogleGenerativeAI(API_KEY);

export interface HighlightCard {
  id: number;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const fetchHighlights = async (topic: string): Promise<HighlightCard[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Generate 10 key highlight cards about "${topic}". 
    Each highlight should contain a title and content.
    Format the response as a JSON array of objects with id, title, and content properties.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from the response
    const jsonStr = text.match(/\[[\s\S]*\]/)?.[0] || "[]";
    const highlights = JSON.parse(jsonStr) as HighlightCard[];
    
    return highlights.slice(0, 10).map((h, i) => ({ ...h, id: i + 1 }));
  } catch (error) {
    console.error("Error fetching highlights:", error);
    return getMockHighlights(topic);
  }
};

export const fetchQuizQuestions = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create 5 multiple-choice quiz questions about "${topic}".
    Each question should have 4 options with one correct answer.
    Format the response as a JSON array of objects with id, question, options (array), and correctAnswer properties.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from the response
    const jsonStr = text.match(/\[[\s\S]*\]/)?.[0] || "[]";
    const questions = JSON.parse(jsonStr) as QuizQuestion[];
    
    return questions.slice(0, 5).map((q, i) => ({ ...q, id: i + 1 }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return getMockQuizQuestions(topic);
  }
};

// Mock data for development/testing
const getMockHighlights = (topic: string): HighlightCard[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Key Point ${i + 1} about ${topic}`,
    content: `This is an important highlight about ${topic}. It contains key information that students should understand about this subject. This is mock content since a real API key is not provided.`,
  }));
};

const getMockQuizQuestions = (topic: string): QuizQuestion[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    question: `Question ${i + 1} about ${topic}?`,
    options: [
      `Option A for question ${i + 1}`,
      `Option B for question ${i + 1}`,
      `Option C for question ${i + 1}`,
      `Option D for question ${i + 1}`,
    ],
    correctAnswer: `Option ${String.fromCharCode(65 + (i % 4))} for question ${i + 1}`,
  }));
};