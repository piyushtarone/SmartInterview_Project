<<<<<<< HEAD
let recognition;
let currentIndex = 0;
let selectedQuestions = [];
let interviewRunning = false;
let feedback = [];

// Fetch questions from backend
async function fetchDynamicQuestions(domain) {
  try {
    const response = await fetch('http://localhost:5000/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain })
    });
    if (!response.ok) throw new Error(`Failed to fetch questions: ${response.statusText}`);
    const data = await response.json();
    if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0)
      throw new Error("No questions returned from API");
    return data.questions;
  } catch (error) {
    alert("Error fetching dynamic questions: " + error.message);
    return [];
  }
}

async function startInterview() {
  const domain = document.getElementById("domain").value;
  selectedQuestions = await fetchDynamicQuestions(domain);

  if (selectedQuestions.length === 0) {
    document.getElementById("question-box").innerText = "No questions available for this domain.";
    return;
  }

  // Shuffle
  selectedQuestions.sort(() => 0.5 - Math.random());

  currentIndex = 0;
  interviewRunning = true;
  feedback = [];
  document.getElementById("downloadBtn").style.display = "none";
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("transcript").innerText = "";

  askNextQuestion();
}

function stopInterview() {
  interviewRunning = false;
  document.getElementById("question-box").innerText = "Interview stopped.";
  if (recognition) { recognition.stop(); recognition = null; }
}

function askNextQuestion() {
  if (!interviewRunning || currentIndex >= selectedQuestions.length) {
    document.getElementById("question-box").innerText = "Interview complete.";
    generateFeedback();
    return;
  }
  const question = selectedQuestions[currentIndex];
  document.getElementById("question-box").innerText = question;
  speak(question);

  setTimeout(() => {
    listenToResponse(question);
    setTimeout(() => {
      if (recognition) { recognition.stop(); recognition = null; }
      currentIndex++;
      askNextQuestion();
    }, 30000);
  }, 4000);
}

function speak(text) {
  if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function listenToResponse(question) {
  const transcriptDiv = document.getElementById("transcript");
  transcriptDiv.innerText = "Listening for your answer...";
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    transcriptDiv.innerText = "Speech Recognition API not supported in this browser.";
    return;
  }
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    transcriptDiv.innerText = `Your Answer: ${transcript}`;
    evaluateAnswer(question, transcript);
  };

  recognition.onerror = (event) => {
    transcriptDiv.innerText = `Error: ${event.error}`;
  };

  recognition.start();
}

// Simple answer evaluation
function evaluateAnswer(question, answer) {
  let score = 0;
  const words = answer.trim().split(/\s+/).length;
  if (words > 10) score = 5;
  else if (words > 5) score = 3;
  else if (words > 0) score = 1;
  else score = 0;
  feedback.push({ question, answer, score });
}

function generateFeedback() {
  if (feedback.length === 0) {
    document.getElementById("feedback").innerHTML = "<p>No feedback to show.</p>";
    return;
  }
  let report = "<h3>Interview Feedback</h3><ul>";
  feedback.forEach(item => {
    report += `<li><strong>Q:</strong> ${item.question}<br/><strong>A:</strong> ${item.answer}<br/><strong>Score:</strong> ${item.score}/5</li>`;
  });
  report += "</ul>";
  document.getElementById("feedback").innerHTML = report;
  document.getElementById("downloadBtn").style.display = "inline-block";
  saveInterviewReport();
}

function saveInterviewReport() {
  const domain = document.getElementById("domain").value;
  const savedReports = JSON.parse(localStorage.getItem("interviewReports") || "[]");
  savedReports.push({
    date: new Date().toISOString(),
    domain,
    feedback
  });
  localStorage.setItem("interviewReports", JSON.stringify(savedReports));
}

function downloadFeedback() {
  const content = feedback
    .map(item => `Q: ${item.question}\nA: ${item.answer}\nScore: ${item.score}/5\n`)
    .join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "interview_feedback.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
=======
let questions = [];
let currentIndex = 0;
let answers = [];
let recognition;
let postureData = { spineAngle: "Not detected" };
const domain = sessionStorage.getItem("domain");
const difficulty = sessionStorage.getItem("level");
const cameraEnabled = sessionStorage.getItem("camera") === "true";

window.onload = async () => {
    const loader = document.getElementById("loader");
    const loaderText = document.getElementById("loader-text");

    // Show the loader immediately
    loader.style.display = 'flex';
    loaderText.textContent = 'Warming up the AI interviewer...';

    // Check for session data first
    const domain = sessionStorage.getItem("domain");
    const difficulty = sessionStorage.getItem("level");
    const cameraEnabled = sessionStorage.getItem("camera") === "true";

    if (!domain || !difficulty) {
        loaderText.textContent = 'Error: No domain or difficulty set. Please start again from the home page.';
        return; // Stop execution
    }

    try {
        // Get media permissions
        await navigator.mediaDevices.getUserMedia({ video: cameraEnabled, audio: true });

        // Fetch questions from the backend
        loaderText.textContent = 'Generating your questions...';
        const res = await fetch('/api/generate-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain, difficulty })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        if (!data.questions || data.questions.length === 0) {
            throw new Error("The AI failed to generate questions. Please try again.");
        }

        questions = data.questions;
        if (cameraEnabled) {
            startCamera();
        }
        startInterview();

    } catch (error) {
        console.error("Initialization Failed:", error);
        loaderText.innerHTML = `<strong>Initialization Failed:</strong><br>${error.message}<br><br>Please check that your server is running and your .env file is correct.`;
        return; 
    } finally {
        
        if (questions.length > 0) {
            loader.style.display = 'none';
        }
    }
};

async function startCamera() {
    const video = document.getElementById("camera");
    video.style.display = 'block';

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
        const net = await posenet.load({ architecture: 'MobileNetV1', outputStride: 16, inputResolution: { width: 200, height: 150 }, multiplier: 0.75 });

        setInterval(async () => {
            const pose = await net.estimateSinglePose(video);
            analyzePosture(pose);
        }, 3000);
    } catch (err) {
        console.error("Camera failed to start:", err);
        video.style.display = 'none';
    }
}

// posture analysis logic
function analyzePosture(pose) {
    const keypoints = pose.keypoints.reduce((map, kp) => {
        map[kp.part] = kp.position;
        return map;
    }, {});

    if (keypoints.leftShoulder && keypoints.rightShoulder && keypoints.leftHip && keypoints.rightHip) {
        const shoulderY = (keypoints.leftShoulder.y + keypoints.rightShoulder.y) / 2;
        const hipY = (keypoints.leftHip.y + keypoints.rightHip.y) / 2;
        const spineVerticality = Math.abs(hipY - shoulderY);

        // Adjusted thresholds for better accuracy
        if (spineVerticality < 40) {
            updatePostureUI("poor", "Poor", "Slouching detected. Please sit up straighter.");
        } else if (spineVerticality < 50) {
            updatePostureUI("moderate", "Okay", "Slight slouch. Try to straighten your back.");
        } else {
            updatePostureUI("good", "Good", "Good posture, keep it up!");
        }
    }
}

// **CORRECTION**: Updated UI function to show recommendations
function updatePostureUI(statusClass, statusText, recommendation) {
    const postureElem = document.getElementById("posture-status");
    const recommendElem = document.getElementById("posture-recommendation");

    postureElem.className = `posture-tag ${statusClass}`;
    postureElem.textContent = `Posture: ${statusText}`;
    
    recommendElem.className = statusClass;
    recommendElem.textContent = recommendation;
    
    postureData.spineAngle = statusText; 
}
//speech recognition handling
function startSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (recognition) recognition.stop();

    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    let finalTranscript = '';

    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        document.getElementById("typed-answer").value = finalTranscript + interimTranscript;
    };
    recognition.start();
}

function startInterview() {
    document.getElementById("interview-container").style.display = 'block';
    displayQuestion();
}
//Reset answer field and update counter
function displayQuestion() {
    document.getElementById("question-text").textContent = questions[currentIndex];
    document.getElementById("question-counter").textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    document.getElementById("typed-answer").value = "";
    speakQuestion(questions[currentIndex]);
    startSpeechRecognition();
}
//speech synthesis handling
function speakQuestion(text) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    synth.speak(utter);
}
//Save answer and proceed to next question or evaluation
function saveAnswerAndProceed() {
    if (recognition) recognition.stop();
    const response = document.getElementById("typed-answer").value.trim();
    answers.push({ question: questions[currentIndex], response: response || "No answer provided." });

    currentIndex++;
    if (currentIndex < questions.length) {
        displayQuestion();
        if (currentIndex === questions.length - 1) {
            document.getElementById("next-question").textContent = "Finish & Evaluate";
        }
    } else {
        evaluateInterview();
    }
}

document.getElementById("next-question").addEventListener("click", saveAnswerAndProceed);

async function evaluateInterview() {
    document.getElementById("interview-container").style.display = "none";
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    document.getElementById("loader-text").textContent = 'Evaluating your answers...';

    try {
        const res = await fetch('/api/evaluate-responses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers, posture: postureData, domain })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to get evaluation.");
        
        displayEvaluation(data.evaluation);
        document.getElementById("evaluation-section").style.display = "block";
    } catch (error) {
        document.getElementById("evaluation-section").innerHTML = `<p style="color:red; text-align:center;">Evaluation Failed: ${error.message}</p>`;
        document.getElementById("evaluation-section").style.display = "block";
    } finally {
        loader.style.display = "none";
    }
}

function displayEvaluation(evaluation) {
    if (!evaluation) {
        document.getElementById("evaluation-section").innerHTML = `<p style="color:red; text-align:center;">Could not parse evaluation data.</p>`;
        return;
    }
    document.getElementById("overall-proficiency").textContent = evaluation.overall_proficiency || 'Not available';
    document.getElementById("overall-feedback").textContent = evaluation.feedback || 'Not available';

    const tbody = document.querySelector("#feedback-table tbody");
    tbody.innerHTML = "";
    if(evaluation.results && evaluation.results.length > 0) {
        evaluation.results.forEach(result => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${result.question || 'N/A'}</td>
                <td>${result.score || 'N/A'}/10</td>
                <td>${result.improvement || 'N/A'}</td>
            `;
        });
    } else {
        tbody.innerHTML = `<tr><td colspan="3">No detailed feedback available.</td></tr>`;
    }
>>>>>>> 6ad88b1b591acef16929632bd9c20f9a2a3279c0
}
