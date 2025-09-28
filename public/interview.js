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
}
