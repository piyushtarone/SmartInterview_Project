document.getElementById('start-btn').addEventListener('click', () => {
  const domain = document.getElementById('domain-select').value;
  const level = document.getElementById('level-select').value;
  const camera = document.getElementById('camera-toggle').checked;

  if (!domain || !level) {
    alert('Please select domain and level!');
    return;
  }

  // Save preferences to localStorage
  localStorage.setItem('interviewSettings', JSON.stringify({ domain, level, camera }));
  window.location.href = '/interview';
});
