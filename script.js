import { questions } from "./questions.js";

// for starting survey.
window.startSurvey = function () {
  document.getElementById("title-page").style.display = "none";
  document.getElementById("waiver-container").style.display = "block";

  initializeDefaultResponses(); // Initialize default responses for image question
  console.log("Here start survey");
};

// Consent form checks.
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

// Will store final response object.
let responses = {};
// Generating Session UUID for each user.
const sessionId =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

let currentQuestion = 0;
let currentImageIndex = 0;

// core function for displaying questions
function displayQuestion() {
  const question = questions[currentQuestion];
  setQuestionNumber(currentQuestion + 1);
  sectionID(currentQuestion);
  const questionTextElement = document.getElementById("question-text");
  if (question.type === "image") {
    questionTextElement.innerText = "";
  } else {
    questionTextElement.innerText = question.text;
  }

  if (question.type === "percentage") {
    setPercentage();
    document.getElementById("percentage").style.display = "block";
    document.getElementById("image-container").style.display = "none";
    document.getElementById("radio-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
  } else if (question.type === "image-desc") {
    setImgDesc();
    document.getElementById("image-desc").style.display = "block";
    if (question.images.length != 0) displayImages(question.images);
    if (question.images.length != 0)
      document.getElementById("image-container").style.display = "";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "image") {
    // console.log("here", question.images);
    if (question.images.length != 0) displayImages(question.images);
    setRating();
    document.getElementById("percentage").style.display = "none";
    if (question.images.length != 0)
      document.getElementById("image-container").style.display = "";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "block";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "block";
  } else if (question.type === "text") {
    document.getElementById("image-container").style.display = "none";
    document.getElementById("percentage").style.display = "none";
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("text-answer-container").style.display = "";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
  } else if (question.type === "text-scroll") {
    setScrollList(question.choices);
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("image-container").style.display = "none";
    document.getElementById("percentage").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "block";
    document.getElementById("text-radio").style.display = "none";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "text-radio") {
    document.getElementById("text-radio").style.display = "block";
    setRadioLabel(question.choices, "radio-container");
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("image-container").style.display = "none";
    document.getElementById("percentage").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "block";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "text-radio-multiple") {
    setMultiRadioSet(question.choices);
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("image-container").style.display = "none";
    document.getElementById("text-answer-container").style.display = "none";
    document.getElementById("percentage").style.display = "none";
    document.getElementById("parent-rating-container").style.display = "none";
    document.getElementById("text-scroll").style.display = "none";
    document.getElementById("text-radio").style.display = "block";
    document.getElementById("parent-radio-container").style.display = "none";
  } else if (question.type === "image-multiple") {
    setMultipleImagesSet(question.images);
    document.getElementById("image-desc").style.display = "none";
    document.getElementById("image-container").style.display = "none";
    document.getElementById("percentage").style.display = "none";
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

  function setImgDesc() {
    let res = "";
    let inputElement = document.getElementById("text-image-desc");

    console.log("hello");
    inputElement.addEventListener("input", function () {
      res = this.value;
      console.log(this.value);
      responses[currentQuestion].response = res;
    });
  }
  function setPercentage() {
    let percentValue = 1;
    let percentInput = document.getElementById("percent-box");
    if (responses[currentQuestion].response != undefined) {
      percentInput.value = responses[currentQuestion].response;
    }
    percentInput.addEventListener("input", function (e) {
      percentValue = e.target.value;
      responses[currentQuestion].response = percentValue;
    });
  }

  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = false;
}

document.getElementById("image-rating").addEventListener("input", function () {
  document.getElementById("rating-value").innerText = this.value;
  submitAnswer(this.value); // Capture image question response
});

let ratingElement = document.getElementById("rating-container");
function setRating() {
  const rating = questions[currentQuestion]?.text;
  const radio = questions[currentQuestion]?.radiotext?.choices;
  document.getElementById("parent-radio-container").innerHTML = "";
  let parentDiv = document.getElementById("parent-rating-container");
  parentDiv.innerHTML = "";
  if (radio) {
    setRadioLabel(radio, "parent-radio-container");
  } else {
    let newRating = ratingElement.cloneNode(true);
    const spanElement = newRating.querySelector("#rating-value");
    let currentRating = 4;
    let h3 = document.createElement("h3");
    h3.innerText = rating;
    newRating.addEventListener("change", (e) => {
      currentRating = e.target.value;
      responses[currentQuestion].response = currentRating;
      spanElement.innerText = currentRating;
    });

    let divElement = document.createElement("div");
    divElement.appendChild(h3);
    divElement.appendChild(newRating);
    parentDiv.appendChild(divElement);
  }
}

// this set radio buttons for text-radio
function setRadioLabel(labelSet, parentDiv) {
  const radioContainer = document.getElementById(parentDiv);
  radioContainer.innerHTML = "";
  let selectedValue = "";
  let textInput = "";
  let radioText = "";
  const radioParent = document.getElementById("radio-container");
  radioParent.style.display = "block";

  const childDiv = document.createElement("div");
  childDiv.classList.add("parent-radio-container");

  if (parentDiv === "parent-radio-container") {
    let h3 = document.createElement("h3");
    h3.innerText = questions[currentQuestion].text;
    childDiv.appendChild(h3);
  }

  if (questions[currentQuestion].description) {
    let textAreaParent = document.getElementById("radio-desc-container");
    textAreaParent.style.display = "block";

    const textAreaElement = document.getElementById("radio-desc-text");
    textAreaElement.addEventListener("input", function () {
      radioText = this.value;
      console.log(radioText);
    });
  }
  else
  {
    let textAreaParent = document.getElementById("radio-desc-container");
    textAreaParent.style.display = "none";

  }

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

    childDiv.appendChild(listDiv);

    // event listener for getting selected value as a response
    inputElement.addEventListener("change", function () {
      selectedValue = this.value;

      // Check if the selected value is "Other"
      if (selectedValue === "Other" || selectedValue === "Other (specify)") {
        let textAreaElement = document.getElementById("text-answer-container");
        textAreaElement.style.display = "none";
        selectedValue = ""; // Reset selectedValue

        // Remove any existing text input
        if (textInput) {
          childDiv.lastChild.removeChild(textInput);
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
        let textAreaElement = document.getElementById("text-answer-container");
        textAreaElement.style.display = "none";
        // Remove any existing text input
        if (textInput) {
          childDiv.lastChild.removeChild(textInput);
          textInput = null;
        }
        let selectedArray = [selectedValue];
        if (selectedValue == "Yes") {
          selectedArray = [radioText];
          console.log(selectedArray);
        } else {
          selectedArray - [selectedValue];
          console.log(selectedArray)
        }

        responses[currentQuestion].response = selectedArray;
      }
    });
  });
  radioContainer.appendChild(childDiv);
}

// this set images on UI for image-multiple
function setMultipleImagesSet(imageSet) {
  const radioContainer = document.getElementById("radio-container");
  radioContainer.innerHTML = "";
  let selectedArray = [];

  // Create a container for the images
  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("images-container");

  imageSet.forEach((imagePath, index) => {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-item");

    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = `image-${index}`;
    inputElement.classList.add("input-box");
    inputElement.value = imagePath;
    inputElement.name = "image-radio";

    const imageElement = document.createElement("img");
    imageElement.src = imagePath;
    imageElement.alt = `Image ${index}`;
    imageElement.classList.add("image-preview");

    // Event listener for getting selected value as a response
    inputElement.addEventListener("change", function () {
      if (this.checked) {
        // If the checkbox is checked, add it to the array
        selectedArray.push(this.value);
      } else {
        // If the checkbox is unchecked, remove it from the array
        const index = selectedArray.indexOf(this.value);
        if (index > -1) {
          selectedArray.splice(index, 1);
        }
      }
    });

    imageDiv.appendChild(inputElement);
    imageDiv.appendChild(imageElement);

    imagesContainer.appendChild(imageDiv);
  });

  radioContainer.appendChild(imagesContainer);
}

// this set radio for text-radio-multiple
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
    });

    listDiv.appendChild(inputElement);
    listDiv.appendChild(labelElement);

    radioContainer.appendChild(listDiv);
  });
}

// this set scroll list for text-scroll
function setScrollList(listSet) {
  let dynamicInput = document.getElementById("dynamic-input");
  if (dynamicInput) {
    let parentElement = dynamicInput.parentNode;
    parentElement.removeChild(dynamicInput);
  }
  const scrollContainer = document.getElementById("select-list");
  scrollContainer.innerHTML = "";
  scrollContainer.classList.add("scroll-list");
  let selectedValue = "";
  let textInput;

  listSet.forEach((item, index) => {
    const optionElement = document.createElement("option");
    optionElement.classList.add("scroll-option");
    optionElement.value = item;
    optionElement.innerHTML = item;

    scrollContainer.appendChild(optionElement);
  });

  scrollContainer.removeEventListener("change", handleSelectChange);
  scrollContainer.addEventListener("change", handleSelectChange);

  function handleSelectChange() {
    selectedValue = scrollContainer.value;

    // Check if the selected value is "Other (please specify)"
    if (selectedValue === "Other (please specify)") {
      let inputElement = document.createElement("input");
      inputElement.id = "dynamic-input";
      const parent = document.getElementById("scroll-container");
      let inputValue = "";

      const check = parent.querySelector("#dynamic-input");
      inputElement.addEventListener("input", function () {
        inputValue = this.value;
        console.log(inputValue);
        responses[currentQuestion].response = [inputValue];
      });
      if (!check) {
        parent.appendChild(inputElement);
      }
    } else {
      const element = document.getElementById("dynamic-input");
      if (element) {
        document.getElementById("scroll-container").removeChild(element);
      }
      let selectedArray = [selectedValue];
      responses[currentQuestion].response = selectedArray;
    }
  }
}

// this displays images
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

// this is next question handler
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
    }, 200);
  }, 200);
}

window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;

// this is previous question handler
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
    }, 200);
  }, 200);
}

document.getElementsByClassName("close")[0].onclick = closeModal;

window.changeImage = changeImage;

function submitAnswer(answer) {
  let thankU = document.getElementById("thank-you");
  thankU.style.display = "block";

  document.getElementById("survey-container").innerHTML = "";
  document.getElementById("survey-container").appendChild(thankU);

  let questionData = questions[currentQuestion];
  responses[currentQuestion] = {
    question_number: currentQuestion,
    question: questionData.text,
    response: answer,
  };
}

// this sets question number
const setQuestionNumber = (currentQuestion) => {
  const questionNumber = document.getElementById("question-number");
  questionNumber.innerText = currentQuestion + "/102";
};

// This is for testing purpose
//testing
window.addEventListener("keydown", function (event) {
  if (event.key.toLowerCase() === "arrowright") {
    nextQuestion();
  }
});

//testing
window.addEventListener("keydown", function (event) {
  if (event.key.toLowerCase() === "arrowleft") {
    prevQuestion();
  }
});

// This is for generating section ID
const sectionID = (currentQuestion) => {
  const sectionIdDiv = document.getElementById("sectionID");
  if (currentQuestion < 8) sectionIdDiv.textContent = "Section 1: Demographics";
  else if (currentQuestion < 12)
    sectionIdDiv.textContent = "Section 2: Investor Profile";
  else if (currentQuestion < 84)
    sectionIdDiv.textContent = "Section 3: Image presentation and perception";
  else if (currentQuestion < 92)
    sectionIdDiv.textContent = "Section 4: Cognitive Biases and Heuristics";
  else if (currentQuestion < 102) sectionIdDiv.textContent = "Section 5: Other";
};

// This is for submiting final response object.
async function submitResponses() {
  const responseArray = Object.keys(responses).map((key) => ({
    sessionid: sessionId,
    ...responses[key],
  }));

  let thankU = document.getElementById("thank-you");
  thankU.style.display = "block";

  document.getElementById("survey-container").innerHTML = "";
  document.getElementById("survey-container").appendChild(thankU);

  console.log(responseArray);

  const endpointUrl = "http://127.0.0.1:5000/insert-data";

  try {
    const res = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseArray),
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// This is for submitting initial form
window.submitWaiver = async function () {
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

  const waiverEndpointUrl = "http://127.0.0.1:5000/insert-waiver";

  try {
    const res = await fetch(waiverEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waiverData),
    });

    const data = await res.json();
    console.log("Waiver submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting waiver:", error);
  }

  document.getElementById("waiver-container").style.display = "none";
  document.getElementById("survey-container").style.display = "block";
  initializeDefaultResponses();
  displayQuestion();
};
