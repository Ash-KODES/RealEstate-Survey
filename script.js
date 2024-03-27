import { questions } from "./questions.js";
// Will store final response object.
let responses = {};

function randomQuestion() {
  // Randomly select a range of questions to remove
  let removalRange = new Map();

  removalRange.set(0, [0, 11]);
  removalRange.set(1, [12, 23]);
  removalRange.set(2, [24, 38]);
  removalRange.set(3, [39, 53]);

  let randomIndex = Math.floor(Math.random() * 4);
  let range = removalRange.get(randomIndex);

  // // remove that range from the questions
  let rangeStart = range[0];
  let rangeEnd = range[1];
  // // Filter out questions excluding the specified range

  return questions.map((item) => {
    if (item.section == 3) {
      const selectedQuestions = item.questions.filter((_, index) => {
        const flag = index < rangeStart || index > rangeEnd;
        return flag;
      });
      return { ...item, questions: selectedQuestions };
    } else {
      return item;
    }
  });
}
const filteredQuestions = randomQuestion();
console.log(filteredQuestions);

// for starting survey.
window.startSurvey = function () {
  document.getElementById("title-page").style.display = "none";
  document.getElementById("waiver-container").style.display = "block";

  initializeDefaultResponses(); // Initialize default responses for image question
};

//for hide all divs
function hideAll() {
  const quest = [
    document.getElementById("percentage"),
    document.getElementById("image-container"),
    document.getElementById("radio-container"),
    document.getElementById("parent-rating-container"),
    document.getElementById("text-scroll"),
    document.getElementById("text-radio"),
    document.getElementById("parent-radio-container"),
    document.getElementById("text-answer-container"),
    document.getElementById("single-images"),
    document.getElementById("image-desc"),
  ];

  quest.map((item) => (item.style.display = "none"));
}

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
  let resIdx = 0;
  filteredQuestions.map((item, section) => {
    item.questions.map((que, idx) => {
      if (que.type === "image") {
        responses[resIdx] = {
          question_number: resIdx,
          question: que.text,
          response: 4,
        };
      } else {
        responses[resIdx] = {
          question_number: resIdx,
          question: que.text,
          response: [],
        };
      }
      resIdx++;
    });
  });
}

// Generating Session UUID for each user.
const sessionId =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

let currentQuestion = 0;
let sectionQuestionIdx = 0;
let sectionIdx = 0;
let currentImageIndex = 0;
let endOfQuestion =
  filteredQuestions.flatMap((obj) => obj.questions).length - 1;
const sectionMsg = [
  {
    title: "Demographics",
    desc: "In this section, we aim to gather some basic demographic information about you. This information is crucial for our study as it helps us understand the diverse backgrounds and perspectives of our participants. We assure you that all responses will be kept confidential and used solely for research purposes.",
  },
  {
    title: "Investor Profile",
    desc: "In this section, we aim to understand your investment profile as it relates to real estate. Your responses will help us gain insights into the motivations and behaviors of different types of property investors. This information is vital for our research on how images influence buyer decisions in the property market.",
  },
  {
    title: "Image Presentation and Perception",
    desc: "In this section, we are asking for your immediate reaction to the images you are being shown. Please do not 'overthink' what you are being asked. Just give your first reaction to the image. Your spontaneous responses are crucial for understanding the immediate impact of visual elements on your property preferences and decision-making process.You will be presented with a series of images depicting different types of houses. Please click on the images and scroll through to view them all. As you view each image, consider how it influences your perception of the property and your willingness to purchase it.",
  },
  {
    title: "The role of creative factors in decision making",
    desc: "This section explores how creative factors influence your property preferences and purchasing decisions. We will present you with a series of images and questions to understand how certain visual elements and societal factors impact your choices.You will be asked to select images that make you more likely to purchase a home, explain your selections, and rate the importance of aesthetics in your decision-making process. Additionally, we will delve into how property style, condition, presentation, and perceived space affect your preferences.",
  },
  {
    title: "Others",
    desc: "Select Others",
  },
];

// core function for displaying filteredQuestions
function displayQuestion() {
  const question = filteredQuestions[sectionIdx].questions[sectionQuestionIdx];
  document.getElementById(
    "sectionID"
  ).innerText = `section ${filteredQuestions[sectionIdx].section} : ${sectionMsg[sectionIdx].title}`;
  document.getElementById("question-number").innerText = `${
    sectionQuestionIdx + 1
  } / ${filteredQuestions[sectionIdx].questions.length} `;

  const questionTextElement = document.getElementById("question-text");
  console.log(question.text);
  if (question.type === "image") {
    questionTextElement.innerText = "";
  } else {
    questionTextElement.innerText = question.text;
  }

  if (question.type === "percentage") {
    hideAll();
    setPercentage(question.uuid);
  } else if (question.type === "image-desc") {
    hideAll();
    setImgDesc(question.uuid);

    if (question.images.length != 0) displayImages(question.images);
    if (question.images.length != 0)
      document.getElementById("image-container").style.display = "";
  } else if (question.type === "image") {
    hideAll();
    setRating(question.uuid);
    if (question.images.length != 0) displayImages(question.images);

    if (question.images.length != 0)
      document.getElementById("image-container").style.display = "";
    document.getElementById("text-radio").style.display = "none";
  } else if (question.type === "text-scroll") {
    hideAll();
    setScrollList(question.choices, question.uuid);
  } else if (question.type === "text-radio") {
    hideAll();
    setRadioLabel(question.choices, "radio-container", question.uuid);
  } else if (question.type === "text-radio-multiple") {
    hideAll();
    setMultiRadioSet(question.choices, question.uuid);
  } else if (question.type === "image-multiple") {
    hideAll();
    setMultipleImagesSet(question.images, question.uuid);
  } else if (question.type === "single-images") {
    hideAll();
    setSingleImageSet(question.images, question.uuid);
  }

  const nextButton = document.getElementById("next-question-button");
  const prevButton = document.getElementById("prev-question-button");

  if (currentQuestion === endOfQuestion) {
    nextButton.innerText = "Submit";
  } else {
    nextButton.innerText = "Next Question";
  }

  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = false;
}

function setImgDesc(uuid) {
  document.getElementById("image-desc").style.display = "block";

  let res = "";
  let InputElement = document.getElementById("text-image-answer");
  console.log("hello");
  InputElement.addEventListener("input", function () {
    res = this.value;
    console.log(this.value);
    responses[currentQuestion].response = [res];
  });
}

function setPercentage(uuid) {
  document.getElementById("percentage").style.display = "block";
  let percentValue = 1;
  let percentInput = document.getElementById("percent-box");

  if (responses[currentQuestion].response != undefined) {
    percentInput.value = responses[currentQuestion].response;
  }
  if (localStorage.getItem(uuid)) {
    percentInput.value = localStorage.getItem(uuid);
  }
  percentInput.addEventListener("input", function (e) {
    percentValue = e.target.value;
    responses[currentQuestion].response = percentValue;
    localStorage.setItem(uuid, percentValue);
  });
}

document.getElementById("image-rating").addEventListener("input", function () {
  document.getElementById("rating-value").innerText = this.value;
  submitAnswer(this.value); // Capture image question response
});

let ratingElement = document.getElementById("rating-container");
function setRating(uuid) {
  document.getElementById("parent-rating-container").style.display = "block";
  document.getElementById("parent-radio-container").style.display = "block";

  if (filteredQuestions[sectionIdx].questions[sectionQuestionIdx].housetype) {
    responses[currentQuestion].housetype =
      filteredQuestions[sectionIdx].questions[sectionQuestionIdx].housetype;
    responses[currentQuestion].home =
      filteredQuestions[sectionIdx].questions[sectionQuestionIdx].home;
  }
  const rating =
    filteredQuestions[sectionIdx].questions[sectionQuestionIdx]?.text;
  const radio =
    filteredQuestions[sectionIdx].questions[sectionQuestionIdx]?.radiotext
      ?.choices;
  document.getElementById("parent-radio-container").innerHTML = "";
  let parentDiv = document.getElementById("parent-rating-container");
  parentDiv.innerHTML = "";
  if (radio) {
    console.log(radio);
    setRadioLabel(radio, "parent-radio-container", uuid);
  } else {
    let newRating = ratingElement.cloneNode(true);
    const spanElement = newRating.querySelector("#rating-value");
    let currentRating = 4; // Default value
    if (localStorage.getItem(uuid)) {
      // Convert the stored value to a number
      currentRating = parseInt(localStorage.getItem(uuid), 10);
      spanElement.innerText = currentRating;
    }
    console.log("current rating", currentRating);
    let h3 = document.createElement("h3");
    h3.innerText = rating;
    newRating.addEventListener("change", (e) => {
      currentRating = parseInt(e.target.value, 10);
      responses[currentQuestion].response = currentRating;
      localStorage.setItem(uuid, currentRating);
      spanElement.innerText = currentRating;
    });

    let divElement = document.createElement("div");
    divElement.appendChild(h3);
    divElement.appendChild(newRating);
    parentDiv.appendChild(divElement);
    document.getElementById("image-rating").value = currentRating;
  }
}

// this set radio buttons for text-radio
function setRadioLabel(labelSet, parentDiv, uuid) {
  document.getElementById("text-radio").style.display = "block";
  document.getElementById("text-radio").style.display = "block";
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
    h3.innerText =
      filteredQuestions[sectionIdx].questions[sectionQuestionIdx].text;
    childDiv.appendChild(h3);
  }

  if (filteredQuestions[sectionIdx].questions[sectionQuestionIdx].description) {
    let textAreaParent = document.getElementById("radio-desc-container");
    textAreaParent.style.display = "block";

    const textAreaElement = document.getElementById("radio-desc-text");
    textAreaElement.addEventListener("input", function () {
      radioText = this.value;
      localStorage.setItem(uuid, radioText);
      responses[currentQuestion].response = [radioText];
    });
  } else {
    let textAreaParent = document.getElementById("radio-desc-container");
    textAreaParent.style.display = "none";
  }

  labelSet.forEach((item, index) => {
    console.log("labelset");
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
    if (localStorage.getItem(uuid) === item) {
      inputElement.checked = true;
    }
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
            localStorage.setItem(uuid, selectedValue);
          });
        }
      } else if (
        filteredQuestions[sectionIdx].questions[sectionQuestionIdx].description
      ) {
        if (selectedValue === "Yes") {
          responses[currentQuestion].response = [radioText];
          localStorage.setItem(uuid, selectedValue);
          console.log("yes, ", responses[currentQuestion].response);
        } else {
          responses[currentQuestion].response = [selectedValue];
          localStorage.setItem(uuid, selectedValue);
          console.log("no, ", responses[currentQuestion].response);
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
        responses[currentQuestion].response = selectedArray;
        localStorage.setItem(uuid, selectedValue);
      }
    });
  });

  radioContainer.appendChild(childDiv);
}

// function to select single images
function setSingleImageSet(imageSet, uuid) {
  const mainContainer = document.getElementById("single-images");
  mainContainer.style.display = "block";
  mainContainer.innerHTML = "";
  let selectedImage = "";
  const parent = document.createElement("div");
  parent.classList.add("single-images");

  // now add a radio options
  imageSet.map((item) => {
    const optionDiv = document.createElement("div");
    optionDiv.classList.add("image-item");

    const radioElement = document.createElement("input");
    radioElement.type = "radio";
    radioElement.name = "single-image";
    radioElement.id = item;
    radioElement.value = item;
    parent.appendChild(radioElement);

    if (localStorage.getItem(uuid) === item) {
      radioElement.checked = true;
    }
    radioElement.addEventListener("change", function () {
      selectedImage = this.value;
      responses[currentQuestion].response = selectedImage;
      localStorage.setItem(uuid, selectedImage);
    });

    // for label
    const labelElment = document.createElement("label");
    labelElment.setAttribute("for", item);
    const imgElement = document.createElement("img");
    imgElement.src = item;
    imgElement.classList.add("image-preview");

    labelElment.appendChild(imgElement);
    optionDiv.appendChild(radioElement);
    optionDiv.appendChild(labelElment);

    parent.appendChild(optionDiv);
  });

  mainContainer.appendChild(parent);
}

// this set images on UI for image-multiple
function setMultipleImagesSet(imageSet, uuid) {
  document.getElementById("text-radio").style.display = "block";
  document.getElementById("radio-container").style.display = "block";
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
    if (localStorage.getItem(uuid)) {
      const storedValue = localStorage.getItem(uuid);
      const storedArray = storedValue.split(",");
      console.log("storedValue", storedArray);
      storedArray.forEach((element) => {
        if (element === imagePath) {
          inputElement.checked = true;
        }
      });
    }
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

      responses[currentQuestion].response = selectedArray;
      localStorage.setItem(uuid, selectedArray);
    });

    imageDiv.appendChild(inputElement);
    imageDiv.appendChild(imageElement);

    imagesContainer.appendChild(imageDiv);
  });

  radioContainer.appendChild(imagesContainer);
}

// this set radio for text-radio-multiple
function setMultiRadioSet(labelSet, uuid) {
  document.getElementById("text-radio").style.display = "block";
  document.getElementById("radio-container").style.display = "block";
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
    if (localStorage.getItem(uuid)) {
      const storedValue = localStorage.getItem(uuid);
      const storedArray = storedValue.split(",");
      console.log("storedValue", storedArray);
      storedArray.forEach((element) => {
        if(element === item){
          inputElement.checked = true;
        }
      });
    }
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
      localStorage.setItem(uuid, selectedArray);
      console.log("selectedArray", selectedArray);
    });

    listDiv.appendChild(inputElement);
    listDiv.appendChild(labelElement);

    radioContainer.appendChild(listDiv);
  });
}

// this set scroll list for text-scroll
function setScrollList(listSet, uuid) {
  document.getElementById("text-scroll").style.display = "block";
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
  listSet.forEach((item, index) => {
    if (localStorage.getItem(uuid) === item) {
      scrollContainer.value = item;
    }
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
        localStorage.setItem(uuid, inputValue);
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
      localStorage.setItem(uuid, selectedArray);
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
      overlay.onclick = () => openModal(imageSet[0], 0);
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
  const images = filteredQuestions[2].questions[currentQuestion - 11].images;
  currentImageIndex =
    (currentImageIndex + step + images.length) % images.length;
  updateModalImageInfo(currentImageIndex);
  document.getElementById("modal-image").src = images[currentImageIndex];
}

function updateModalImageInfo(index) {
  const totalImages =
    filteredQuestions[2].questions[currentQuestion - 11].images?.length;
  const imageInfo = document.getElementById("image-info");
  imageInfo.innerText = `Image ${index + 1} of ${totalImages}`;
}

// for Display Next Section Page
function displayNextSection(sectionNo, title, desc) {
  const page = document.getElementById("section-page");
  page.style.display = "block";
  document.getElementById("survey-container").style.display = "none";
  const button = page.querySelector("button");

  const section = document.getElementById("section-no");
  section.innerText = sectionNo;

  const sectionTitle = document.getElementById("section-title");
  sectionTitle.innerText = title;

  const sectionDesc = document.getElementById("section-desc");
  sectionDesc.innerText = desc;

  const buttonClickHandler = () => {
    page.style.display = "none";
    button.removeEventListener("click", buttonClickHandler);
    document.getElementById("survey-container").style.display = "block";
    displayQuestion();
  };
  button.addEventListener("click", buttonClickHandler);
}

// this is next question handler
function nextQuestion() {
  const surveyContainer = document.getElementById("survey-container");
  surveyContainer.classList.add("fade-out");

  setTimeout(() => {
    if (
      filteredQuestions[sectionIdx].questions[sectionQuestionIdx].type ===
      "text"
    ) {
      let textResponse = document.getElementById("text-answer").value;
      submitAnswer(textResponse); // Capture text question response
    }

    // Add datetime to the current question response
    if (responses[currentQuestion]) {
      responses[currentQuestion].datetime = new Date().toISOString();
    }

    if (currentQuestion === endOfQuestion) {
      submitResponses();
    } else {
      currentQuestion++;
      sectionQuestionIdx++;
      if (
        sectionQuestionIdx == filteredQuestions[sectionIdx].questions.length
      ) {
        sectionIdx++;
        sectionQuestionIdx = 0;
        displayNextSection(
          filteredQuestions[sectionIdx].section,
          sectionMsg[sectionIdx].title,
          sectionMsg[sectionIdx].desc
        );
      } else {
        displayQuestion();
      }
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
    if (sectionQuestionIdx == 0) {
      sectionIdx--;
      sectionQuestionIdx = filteredQuestions[sectionIdx].questions.length - 1;
    } else {
      sectionQuestionIdx--;
    }
    if (currentQuestion < 0) {
      currentQuestion = filteredQuestions.length - 1;
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

  let questionData = filteredQuestions[currentQuestion];
  responses[currentQuestion] = {
    question_number: currentQuestion,
    question: questionData.text,
    response: answer,
    hometype: questionData?.housetype || null,
    home: questionData?.home || null,
  };
}

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
  else if (currentQuestion < 67 - rangeChange)
    sectionIdDiv.textContent = "Section 3: Image presentation and perception";
  else if (currentQuestion < 76 - rangeChange)
    sectionIdDiv.textContent =
      "Section 4: The role of creative factors in decision making";
};

// This is for submiting final response object.
async function submitResponses() {
  const responseArray = Object.keys(responses).map((key) => ({
    sessionid: sessionId,
    ...responses[key],
  }));

  console.log(responseArray);

  let thankU = document.getElementById("thank-you");
  thankU.style.display = "block";

  document.getElementById("survey-container").innerHTML = "";
  document.getElementById("survey-container").appendChild(thankU);

  console.log(responseArray);

  const endpointUrl = "https://unisaresponsesflask.replit.app/insert-data";

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
window.submitWaiver = function () {
  // Removed async keyword
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

  // Immediately move to the next page
  document.getElementById("waiver-container").style.display = "none";
  document.getElementById("survey-container").style.display = "block";
  initializeDefaultResponses();
  displayNextSection(
    filteredQuestions[sectionIdx].section,
    sectionMsg[sectionIdx].title,
    sectionMsg[sectionIdx].desc
  );

  // Submit the form data in the background
  (async () => {
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
  })(); // Immediately invoke the async function
};
