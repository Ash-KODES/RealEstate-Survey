import { questions } from "./questions.js";

window.startSurvey = function () {
  document.getElementById("title-page").style.display = "none";
  document.getElementById("waiver-container").style.display = "block";

  initializeDefaultResponses(); // Initialize default responses for image question
  console.log("Here start survey");
};

window.consentForm = function () {
  const inputValue = document.getElementById("input-box");
  const isChecked = document.getElementById("check-box");
  if (!inputValue.value || !isChecked.checked) {
    alert(
      "please enter your name and aggree to terms and conditions to continue"
    );
  } else {
    document.getElementById("survey-container").style.display = "block";
    document.getElementById("waiver-container").style.display = "none";
  }
};

// Initialize default responses for image questions
function initializeDefaultResponses() {
  questions.forEach((question, index) => {
    if (question.type === "image") {
      responses[index] = {
        question_number: index,
        question: question.text,
        response: 4, // Default value for the slider
      };
    } else {
      responses[index] = {
        question_number: index,
        question: question.text,
        response: [],
      };
    }
  });
}

let responses = {};
const sessionId =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

let currentQuestion = 0;
let currentImageIndex = 0;

function displayQuestion() {
  const question = questions[currentQuestion];
  const questionTextElement = document.getElementById("question-text");
  questionTextElement.innerText = question.text;
  setQuestionNumber(currentQuestion + 1);
  sectionID(currentQuestion);
  if (question.type === "image") {
    displayImages(question.images);
    setRating();
    document.getElementById("image-container").style.display = "";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "block";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "block";
  } else if (question.type === "text") {
    document.getElementById("image-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "text-scroll") {
    setScrollList(question.choices);
    document.getElementById("image-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "block";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "text-radio") {
    setRadioLabel(question.choices, "radio-container");
    document.getElementById("image-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "block";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "text-radio-multiple") {
    setMultiRadioSet(question.choices);
    document.getElementById("image-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "block";
    document.getElementById("parent-radio-container").style.display = "none";
  }

  const nextButton = document.getElementById("next-question-button");
  const prevButton = document.getElementById("prev-question-button");

  if (currentQuestion === questions.length - 1) {
    nextButton.innerText = "Submit";
  } else {
    nextButton.innerText = "Next Question";
  }

  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = false;
}

document.getElementById("image-rating").addEventListener("input", function () {
  document.getElementById("rating-value").innerText = this.value;
  submitAnswer(this.value); // Capture image question response
});

function setRating() {
  const radioQuest = questions[currentQuestion].radiotext.choices;
  const ratingQuest = questions[currentQuestion].rating;
  const ratingDiv = document.getElementById("rating-container");
  const parentDiv = document.getElementById("parent-rating-container");
  const parentRadioElement = document.getElementById("parent-radio-container");
  parentRadioElement.innerHTML = "";
  parentDiv.innerHTML = "";

  parentDiv.style.display = "block";
  ratingQuest.forEach((item) => {
    let newRatingDiv = ratingDiv.cloneNode(true);

    let questText = document.createElement("h3");
    questText.innerText = item;
    parentDiv.appendChild(questText);
    parentDiv.appendChild(newRatingDiv);
  });

  setRadioLabel(radioQuest, "parent-radio-container");
}

function setRadioLabel(labelSet, parentDiv) {
  const radioContainer = document.getElementById(parentDiv);
  radioContainer.innerHTML = "";
  let selectedValue = "";
  let textInput;

  labelSet.forEach((item, index) => {
    const listDiv = document.createElement("div");
    listDiv.classList.add("list-item");

    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.id = item;
    inputElement.classList.add("input-box");
    inputElement.value = item;
    inputElement.name = "radio-options";
    inputElement.style.cursor = "pointer";

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", item);
    labelElement.innerText = item;
    labelElement.style.cursor = "pointer";

    listDiv.appendChild(inputElement);
    listDiv.appendChild(labelElement);

    radioContainer.appendChild(listDiv);

    // event listener for getting selected value as a response
    inputElement.addEventListener("change", function () {
      selectedValue = this.value;

      // Check if the selected value is "Other"
      if (selectedValue === "Other") {
        selectedValue = ""; // Reset selectedValue

        // Remove any existing text input
        if (textInput) {
          radioContainer.lastChild.removeChild(textInput);
          textInput = null;
        }

        // Create a new text input
        textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = "";

        listDiv.appendChild(textInput);

        // Add event listener only if it's not already added
        if (!textInput.hasEventListener) {
          textInput.hasEventListener = true;

          // Event listener for updating selectedValue
          textInput.addEventListener("input", function () {
            selectedValue = this.value;
            console.log("inside", selectedValue);
            let selectedArray = [selectedValue];
            responses[currentQuestion].response = selectedArray;
          });
        }
      } else {
        // Remove any existing text input
        if (textInput) {
          radioContainer.lastChild.removeChild(textInput);
          textInput = null;
        }
        let selectedArray = [selectedValue];
        responses[currentQuestion].response = selectedArray;
      }
    });
  });
}

function setMultiRadioSet(labelSet) {
  const radioContainer = document.getElementById("radio-container");
  radioContainer.innerHTML = "";
  let selectedValue = "";
  let selectedArray = [];

  labelSet.forEach((item, index) => {
    const listDiv = document.createElement("div");
    listDiv.style.cursor = "pointer";
    listDiv.classList.add("list-item");

    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = item;
    inputElement.classList.add("input-box");
    inputElement.value = item;
    inputElement.name = item;
    inputElement.style.cursor = "pointer";

    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", item);
    labelElement.innerText = item;
    labelElement.style.cursor = "pointer";

    // event listener for getting selected value as a response
    inputElement.addEventListener("change", function () {
      selectedValue = this.value;

      if (this.checked) {
        // If the radio button is checked, add it to the array
        selectedArray.push(this.value);
      } else {
        // If the radio button is unchecked, remove it from the array
        const index = selectedArray.indexOf(this.value);
        if (index > -1) {
          selectedArray.splice(index, 1);
        }
      }
      responses[currentQuestion].response = selectedArray;
      // console.log("Selected Value:", selectedArray);
    });

    listDiv.appendChild(inputElement);
    listDiv.appendChild(labelElement);

    radioContainer.appendChild(listDiv);
  });
}

function setScrollList(listSet) {
  const scrollContainer = document.getElementById("select-list");
  scrollContainer.innerHTML = "";
  scrollContainer.classList.add("scroll-list");
  let selectedValue = "";

  listSet.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.classList.add("scroll-option");
    optionElement.value = item;
    optionElement.innerHTML = item;

    scrollContainer.appendChild(optionElement);
  });

  // Remove existing event listener if any
  scrollContainer.removeEventListener("change", handleSelectChange);

  // Add a new event listener
  scrollContainer.addEventListener("change", handleSelectChange);

  function handleSelectChange() {
    selectedValue = scrollContainer.value;
    let selectedArray = [selectedValue];
    responses[currentQuestion].response = selectedArray;
    // console.log("Selected Value: ", selectedArray);
  }
}

function displayImages(imageSet) {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = "";

  const mainImage = document.createElement("img");
  mainImage.className = "main-image";
  mainImage.src = imageSet[0];
  mainImage.onclick = () => openModal(imageSet[0], 0);
  imageContainer.appendChild(mainImage);

  const thumbnailsContainer = document.createElement("div");
  thumbnailsContainer.className = "thumbnails-container";
  imageContainer.appendChild(thumbnailsContainer);

  const thumbnailCount = Math.min(imageSet.length, 4);
  for (let i = 1; i < thumbnailCount; i++) {
    const thumbContainer = document.createElement("div");
    thumbContainer.className = "thumbnail-container";

    const thumb = document.createElement("img");
    thumb.className = "thumbnail";
    thumb.src = imageSet[i];
    thumb.onclick = () => openModal(imageSet[i], i);
    thumbContainer.appendChild(thumb);

    if (i === thumbnailCount - 1 && imageSet.length > 4) {
      const overlay = document.createElement("div");
      overlay.className = "thumbnail-overlay";
      overlay.innerText = `+${imageSet.length - 4}`;
      thumbContainer.appendChild(overlay);
    }
    thumbnailsContainer.appendChild(thumbContainer);
  }
}

function openModal(imageSrc, index) {
  currentImageIndex = index;
  updateModalImageInfo(index);
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function changeImage(step) {
  const images = questions[currentQuestion].images;
  currentImageIndex =
    (currentImageIndex + step + images.length) % images.length;
  updateModalImageInfo(currentImageIndex);
  document.getElementById("modal-image").src = images[currentImageIndex];
}

function updateModalImageInfo(index) {
  const totalImages = questions[currentQuestion].images.length;
  const imageInfo = document.getElementById("image-info");
  imageInfo.innerText = `Image ${index + 1} of ${totalImages}`;
}

function nextQuestion() {
  const surveyContainer = document.getElementById("survey-container");
  surveyContainer.classList.add("fade-out");

  setTimeout(() => {
    if (questions[currentQuestion].type === "text") {
      let textResponse = document.getElementById("text-answer").value;
      submitAnswer(textResponse); // Capture text question response
    }

    // Add datetime to the current question response
    if (responses[currentQuestion]) {
      responses[currentQuestion].datetime = new Date().toISOString();
    }

    if (currentQuestion === questions.length - 1) {
      submitResponses();
    } else {
      currentQuestion++;
      displayQuestion();
    }

    surveyContainer.classList.remove("fade-out");
    surveyContainer.classList.add("fade-in");

    setTimeout(() => {
      surveyContainer.classList.remove("fade-in");
    }, 400);
  }, 400);
}

window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;

function prevQuestion() {
  const surveyContainer = document.getElementById("survey-container");
  surveyContainer.classList.add("fade-out");

  setTimeout(() => {
    currentQuestion--;
    if (currentQuestion < 0) {
      currentQuestion = questions.length - 1;
    }
    displayQuestion();

    surveyContainer.classList.remove("fade-out");
    surveyContainer.classList.add("fade-in");

    setTimeout(() => {
      surveyContainer.classList.remove("fade-in");
    }, 400);
  }, 400);
}

document.getElementsByClassName("close")[0].onclick = closeModal;

window.changeImage = changeImage;

function submitAnswer(answer) {
  let questionData = questions[currentQuestion];
  responses[currentQuestion] = {
    question_number: currentQuestion,
    question: questionData.text,
    response: answer,
  };
}
const setQuestionNumber = (currentQuestion) => {
  const questionNumber = document.getElementById("question-number");
  questionNumber.innerText = `${currentQuestion}/50`;
};

const sectionID = (currentQuestion) => {
  const sectionIdDiv = document.getElementById("sectionID");
  if (currentQuestion < 5) sectionIdDiv.innerText = "Section 1: Demographics";
  else if (currentQuestion < 10)
    sectionIdDiv.innerText = "Section 2: Investor Profile";
  else if (currentQuestion < 50)
    sectionIdDiv.innerText = "Section 3: Image presentation and perception";
  else if (currentQuestion < 50)
    sectionIdDiv.innerText = "Section 4: Cognitive Biases and Heuristics";
  else if (currentQuestion < 50) sectionIdDiv.innerText = "Section 5: Other";
};

function submitResponses() {
  const responseArray = Object.keys(responses).map((key) => ({
    sessionid: sessionId,
    ...responses[key],
  }));

  console.log(responseArray);

  const endpointUrl = "https://unisaresponsesflask.replit.app/insert-data";

  responseArray.forEach((response) => {
    fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
}

window.submitWaiver = function () {
  const participantName = document.getElementById("signature").value;
  const agreeTerms = document.getElementById("agree-terms").checked;

  if (!participantName || !agreeTerms) {
    alert(
      "Please enter your name and agree to the terms and conditions to continue."
    );
    return;
  }

  const waiverData = {
    participantName: participantName,
    agreedToTerms: agreeTerms,
  };

  const waiverEndpointUrl =
    "https://unisaresponsesflask.replit.app/insert-waiver";

  fetch(waiverEndpointUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(waiverData),
  })
    .then((res) => res.json())
    .then((data) => console.log("Waiver submitted successfully:", data))
    .catch((error) => console.error("Error submitting waiver:", error));

  document.getElementById("waiver-container").style.display = "none";
  document.getElementById("survey-container").style.display = "block";
  initializeDefaultResponses();
  displayQuestion();
};
