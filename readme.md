# Real Estate Survey Documentation

## Editing Questions

Questions for the survey are managed through a JavaScript file named `questions.js`, which contains all the questions in a sequential order. To edit a question, follow these steps:

1. Open the `questions.js` file in your preferred code editor.
2. Locate the question you wish to edit.
3. Make the necessary changes directly within the object representing the question.


## Adding Questions
Just add the question in question.js script in a perticular section in the below format and you are good to go.
`questions.js` file consist of an array of object. where each object describe a section itself. each object contains questions array belongs to particular section.

To add a new question, simply add a new object to the questions array under the appropriate section, following the same structure as existing questions. If you need to add a new section, create a new object with the section and questions keys, then add it to the questions array.

when adding a new question remember to add any of the following types.
- Text input (`text`)
- Single choice radio buttons (`text-radio`)
- Multiple choice checkboxes (`text-radio-multiple`)
- Image selection (`images`)
- Percentage sliders (`percentage`)
- etc

### Example of Adding a Question

Below is a template for adding a new question of the type `text-radio`, which represents a question with radio button options:

```js
{
    type: "text-radio",
    text: "Here is the question text?"
    choices :["choiceA","choiceB"]
}
```

### Steps to Add a Question
1. Open the questions.js file.
2. Scroll to the section where you want to insert the new question.
3. Create a new object with the type and text attributes, following the template provided above. Ensure you choose the correct type based on the question format you need.
4. Save the changes to the questions.js file.

### Supported Question Types
This section provides a brief overview of each question type supported by our survey framework:

1. **Text Input (text)**: Allows respondents to enter a freeform text answer.
2. **Single Choice Radio Buttons (text-radio)**: Presents a set of mutually exclusive options, where the respondent can select one.
3. **Multiple Choice Checkboxes (text-radio-multiple)**: Offers a list of options from which respondents can select multiple answers.
4. **Image Selection (image)**: Enables selection from a set of images.
5. **Percentage Sliders (percentage)**: Allows allocation of percentages across different categories.
6. **text-scroll** : Scrolling selcection questoin. Example: select your eduction question.
7. **image-multiple** : question for selecting multiple images.