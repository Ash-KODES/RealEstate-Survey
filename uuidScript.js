import { v4 as uuidv4 } from "uuid";
import { questions } from "./questions";
// Assuming the questions object is defined as provided in your example
const questionsWithUuid = questions.map((section) => ({
  ...section, // Spread the existing section properties
  questions: section.questions.map((question) => ({
    ...question, // Spread the existing question properties
    uuid: uuidv4(), // Add a new UUID property to each question
  })),
}));

questionsWithUuid();

console.log(questionsWithUuid);
