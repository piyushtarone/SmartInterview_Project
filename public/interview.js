let questions = [];
let currentIndex = 0;
let answers = [];
let recognition;
let postureData = { spineAngle: "Not detected" };
const domain = sessionStorage.getItem("domain");
const difficulty = sessionStorage.getItem("level");
const cameraEnabled = sessionStorage.getItem("camera") === "true";

window.onload = async () => {
    if (!domain || !difficulty) {
        alert("Session expired. Redirecting to home page.");
        window.location.href = "index.html";
        return;
    }

    try {
        await navigator.mediaDevices.getUserMedia({ video: cameraEnabled, audio: true });
    } catch (err) {
        alert("Camera and microphone access are required. Please allow permissions and refresh.");
        return;
    }

    document.getElementById("loader").style.display = 'flex';

    try {
        const res = await fetch('/api/generate-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain, difficulty })
        });
        const data = await res.json();
        if (!res.ok || !data.questions) throw new Error(data.error || "Failed to generate questions.");
        
        questions = data.questions;
        if (cameraEnabled) {
            startCamera();
        }
        startInterview();
    } catch (error) {
        document.getElementById("loader-text").textContent = `Error: ${error.message}`;
    } finally {
        document.getElementById("loader").style.display = 'none';
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

// ... (variable declarations at the top remain the same) ...

// **CORRECTION**: Updated posture analysis logic
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
        if (spineVerticality < 60) {
            updatePostureUI("poor", "Poor", "Slouching detected. Please sit up straighter.");
        } else if (spineVerticality < 80) {
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
    
    postureData.spineAngle = statusText; // Keep this for the final report
}


// ... (The rest of the interview.js file remains the same as the previous version) ...
// The `window.onload`, `startCamera`, `startSpeechRecognition`, `startInterview`,
// `displayQuestion`, `speakQuestion`, `saveAnswerAndProceed`, `evaluateInterview`,
// and `displayEvaluation` functions are unchanged from the last update.


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

function displayQuestion() {
    document.getElementById("question-text").textContent = questions[currentIndex];
    document.getElementById("question-counter").textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    document.getElementById("typed-answer").value = "";
    speakQuestion(questions[currentIndex]);
    startSpeechRecognition();
}

function speakQuestion(text) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    synth.speak(utter);
}

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
}
