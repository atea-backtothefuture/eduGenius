
export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
}

export type LessonSlide = {
  slide: number;
  title: string;
  points: string[];
};

export type InterviewQuestion = {
  question: string;
  answer: string;
};

export type GeneratedContent = {
  lessonPlan: LessonSlide[];
  interviewQuestions: InterviewQuestion[];
};

export type ChatMessageContent = string | { sections: string[] } | { content: GeneratedContent };

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: ChatMessageContent;
  topic?: string;
}
