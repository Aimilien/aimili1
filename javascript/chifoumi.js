document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const userChoiceDisplay = document.getElementById("userChoice");
    const computerChoiceDisplay = document.getElementById("computerChoice");
    const outcomeDisplay = document.getElementById("outcome");
    const scoreDisplay = document.getElementById("score");

    const options = ["Pierre", "Papier", "Ciseaux"];
    let score = 0;

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }

    function getOutcome(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "Égalité !";
        } else if (
            (userChoice === "Pierre" && computerChoice === "Ciseaux") ||
            (userChoice === "Papier" && computerChoice === "Pierre") ||
            (userChoice === "Ciseaux" && computerChoice === "Papier")
        ) {
            score++;
            return "Vous gagnez !";
        } else {
            score = Math.max(0, score - 1);
            return "Vous perdez !";
        }
    }

    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            const userChoice = choice.getAttribute("data-choice");
            const computerChoice = getComputerChoice();

            userChoiceDisplay.textContent = userChoice;
            computerChoiceDisplay.textContent = computerChoice;

            const outcome = getOutcome(userChoice, computerChoice);
            outcomeDisplay.textContent = outcome;

            scoreDisplay.textContent = score;
        });
    });
});