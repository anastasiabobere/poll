const poll = new Map();
poll.set("6VSK", 0);
poll.set("2VSK", 0);
poll.set("4VSK", 0);
poll.set("VV1G", 0);
poll.set("VT", 0);

function submitForm(e) {
  e.preventDefault();
  const selectedOption = document.querySelector(
    "input[name='poll-option']:checked",
  );

  if (!selectedOption) {
    alert("Select an option");
    return;
  }

  let voteCount = poll.get(selectedOption.value);
  poll.set(selectedOption.value, voteCount + 1);

  addVotesToStorage(selectedOption.value);
  displayResults();
}

function displayResults() {
  const results = document.getElementById("results");
  results.innerHTML = "";
  for (let [option, votes] of poll) {
    const optionElement = document.createElement("div");
    optionElement.classList.add(
      "border-bottom",
      "p-2",
      "d-flex",
      "justify-content-between",
    );
    optionElement.innerHTML = `<strong>${option}:</strong> ${votes} votes`;
    results.appendChild(optionElement);
  }
}

function checkIfVoted() {
  if (localStorage.getItem("vote") != null) {
    alert("ALready voted");
    document
      .getElementById("poll-form")
      .querySelectorAll("input", "button")
      .forEach((el) => el.setAttribute("disabled", true));
    displayResults();
  }
}
function getVotesFromStorage() {
  const votesFromStorage = JSON.parse(localStorage.getItem("vote")) || [];

  // Update poll map with stored votes
  votesFromStorage.forEach((vote) => {
    let count = poll.get(vote) || 0;
    poll.set(vote, count + 1);
  });
}

// Store only the selected option value in localStorage
function addVotesToStorage(vote) {
  const votesFromStorage = JSON.parse(localStorage.getItem("vote")) || [];
  votesFromStorage.push(vote);
  localStorage.setItem("vote", JSON.stringify(votesFromStorage));
}

document.addEventListener("DOMContentLoaded", () => {
  getVotesFromStorage();
  checkIfVoted();
});

document.getElementById("poll-form").addEventListener("submit", submitForm);
