import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedContent } from '../types';

// The API_KEY will be injected into this placeholder by the Docker entrypoint script.
// When running locally without Docker, you must replace "API_KEY_PLACEHOLDER" with your actual key.
const ai = new GoogleGenAI({ apiKey: "API_KEY_PLACEHOLDER" });

export async function generateSections(topic: string): Promise<string[]> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the topic "${topic}", identify the 10 most important and commercially relevant sub-topics or sections for the current job market. These sections should be distinct and foundational for a professional in the field. Format the output as a JSON array of strings.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                        description: "A key sub-topic or section."
                    }
                }
            }
        });

        const sections = JSON.parse(response.text);
        if (Array.isArray(sections) && sections.every(s => typeof s === 'string')) {
            return sections;
        }
        throw new Error("Invalid format for sections received from API.");

    } catch (error) {
        console.error("Error in generateSections:", error);
        throw new Error("Failed to generate sections from AI.");
    }
}

export async function generateContentForSection(topic: string, section: string): Promise<GeneratedContent> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an expert curriculum designer. For the main topic "${topic}" and the specific section "${section}", create a comprehensive educational module. Your output must be a JSON object containing two keys: "lessonPlan" and "interviewQuestions".
1. "lessonPlan": An array of exactly 8 slide objects. Each object must have "slide" (number from 1 to 8), "title" (string), and "points" (an array of 3-5 strings, with each string being a key concept for that slide).
2. "interviewQuestions": An array of 5 objects. Each object must have "question" (string) and "answer" (a detailed string explaining the concept and providing an example).`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        lessonPlan: {
                            type: Type.ARRAY,
                            description: "An array of 8 lesson plan slides.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    slide: { type: Type.NUMBER, description: "Slide number" },
                                    title: { type: Type.STRING, description: "Title of the slide" },
                                    points: {
                                        type: Type.ARRAY,
                                        description: "Key bullet points for the slide.",
                                        items: { type: Type.STRING }
                                    }
                                },
                                required: ['slide', 'title', 'points']
                            }
                        },
                        interviewQuestions: {
                            type: Type.ARRAY,
                            description: "An array of 5 interview questions and answers.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING, description: "The interview question." },
                                    answer: { type: Type.STRING, description: "A detailed answer to the question." }
                                },
                                required: ['question', 'answer']
                            }
                        }
                    },
                    required: ['lessonPlan', 'interviewQuestions']
                }
            }
        });

        const content = JSON.parse(response.text);
        // Add validation here if needed
        return content as GeneratedContent;

    } catch (error) {
        console.error("Error in generateContentForSection:", error);
        throw new Error("Failed to generate content from AI.");
    }
}