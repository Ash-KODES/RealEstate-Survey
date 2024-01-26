import { questions } from "./questions.js";

window.startSurvey = function() {
  document.getElementById('title-page').style.display = 'none';
  document.getElementById('survey-container').style.display = 'block';
  initializeDefaultResponses(); // Initialize default responses for image questions
  displayQuestion();
  console.log("Here start survey")
};


// Initialize default responses for image questions
function initializeDefaultResponses() {
  questions.forEach((question, index) => {
    if (question.type === "image") {
      responses[index] = {
        question_number: index,
        question: question.text,
        response: 4 // Default value for the slider
      };
    }
  });
}

let responses = {};
const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2);

let currentQuestion = 0;
let currentImageIndex = 0;

function displayQuestion() {
  const question = questions[currentQuestion];
  const questionTextElement = document.getElementById('question-text');
  questionTextElement.textContent = question.text;

  if (question.type === "image") {
      displayImages(question.images);
      document.getElementById('image-container').style.display = '';
      document.getElementById('text-answer-container').style.display = 'none';
      document.getElementById('rating-container').style.display = 'block';
  } else if (question.type === "text") {
      document.getElementById('image-container').style.display = 'none';
      document.getElementById('text-answer-container').style.display = '';
      document.getElementById('rating-container').style.display = 'none';
  }

  const nextButton = document.getElementById('next-question-button');
  const prevButton = document.getElementById('prev-question-button');

  if (currentQuestion === questions.length - 1) {
      nextButton.textContent = 'Submit';
  } else {
      nextButton.textContent = 'Next Question';
  }

  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = false;
}

document.getElementById('image-rating').addEventListener('input', function() {
  document.getElementById('rating-value').textContent = this.value;
  submitAnswer(this.value); // Capture image question response
});



function displayImages(imageSet) {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  const mainImage = document.createElement('img');
  mainImage.className = 'main-image';
  mainImage.src = imageSet[0];
  mainImage.onclick = () => openModal(imageSet[0], 0);
  imageContainer.appendChild(mainImage);

  const thumbnailsContainer = document.createElement('div');
  thumbnailsContainer.className = 'thumbnails-container';
  imageContainer.appendChild(thumbnailsContainer);

  const thumbnailCount = Math.min(imageSet.length, 4);
  for (let i = 1; i < thumbnailCount; i++) {
      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'thumbnail-container';

      const thumb = document.createElement('img');
      thumb.className = 'thumbnail';
      thumb.src = imageSet[i];
      thumb.onclick = () => openModal(imageSet[i], i);
      thumbContainer.appendChild(thumb);

      if (i === thumbnailCount - 1 && imageSet.length > 4) {
          const overlay = document.createElement('div');
          overlay.className = 'thumbnail-overlay';
          overlay.textContent = `+${imageSet.length - 4}`;
          thumbContainer.appendChild(overlay);
      }
      thumbnailsContainer.appendChild(thumbContainer);
  }
}

function openModal(imageSrc, index) {
  currentImageIndex = index;
  updateModalImageInfo(index);
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-image');
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
}

function changeImage(step) {
  const images = questions[currentQuestion].images;
  currentImageIndex = (currentImageIndex + step + images.length) % images.length;
  updateModalImageInfo(currentImageIndex);
  document.getElementById('modal-image').src = images[currentImageIndex];
}

function updateModalImageInfo(index) {
  const totalImages = questions[currentQuestion].images.length;
  const imageInfo = document.getElementById('image-info');
  imageInfo.textContent = `Image ${index + 1} of ${totalImages}`;
}

function nextQuestion() {
  if (questions[currentQuestion].type === "text") {
    let textResponse = document.getElementById('text-answer').value;
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

  const surveyContainer = document.getElementById('survey-container');
  surveyContainer.classList.add('fade-out');
  setTimeout(() => {
      surveyContainer.classList.remove('fade-out');
      surveyContainer.classList.add('fade-in');
      setTimeout(() => {
          surveyContainer.classList.remove('fade-in');
      }, 500); 
  }, 500); 
}

window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;

function prevQuestion() {
  const surveyContainer = document.getElementById('survey-container');
  surveyContainer.classList.add('fade-out');
  setTimeout(() => {
      currentQuestion--;
      if (currentQuestion < 0) {
          currentQuestion = questions.length - 1;
      }
      displayQuestion();
      surveyContainer.classList.remove('fade-out');
      surveyContainer.classList.add('fade-in');
      setTimeout(() => {
          surveyContainer.classList.remove('fade-in');
      }, 500); 
  }, 500); 
}

document.getElementsByClassName('close')[0].onclick = closeModal;

window.changeImage = changeImage;

function submitAnswer(answer) {
  let questionData = questions[currentQuestion];
  responses[currentQuestion] = {
    question_number: currentQuestion,
    question: questionData.text,
    response: answer
  };
}

function submitResponses() {
  const responseArray = Object.keys(responses).map(key => ({
    sessionid: sessionId,
    ...responses[key]
  }));

  const endpointUrl = 'https://unisaresponsesflask.replit.app/insert-data';

  responseArray.forEach(response => {
    fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  });
}
