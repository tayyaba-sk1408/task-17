const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseInput = document.getElementById("uppercase");
const lowercaseInput = document.getElementById("lowercase");
const numbersInput = document.getElementById("numbers");
const symbolsInput = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});

function getSelectedCharacters() {
    let characters = "";

    if (uppercaseInput.checked) {
        characters += characterSets.uppercase;
    }

    if (lowercaseInput.checked) {
        characters += characterSets.lowercase;
    }

    if (numbersInput.checked) {
        characters += characterSets.numbers;
    }

    if (symbolsInput.checked) {
        characters += characterSets.symbols;
    }

    return characters;
}

function generatePassword() {
    const length = Number(lengthInput.value);
    const characters = getSelectedCharacters();

    if (!characters) {
        passwordInput.value = "";
        message.textContent = "Please select at least one character type.";
        message.style.color = "#dc2626";
        return;
    }

    let password = "";

    if (uppercaseInput.checked) {
        password += getRandomCharacter(characterSets.uppercase);
    }

    if (lowercaseInput.checked && password.length < length) {
        password += getRandomCharacter(characterSets.lowercase);
    }

    if (numbersInput.checked && password.length < length) {
        password += getRandomCharacter(characterSets.numbers);
    }

    if (symbolsInput.checked && password.length < length) {
        password += getRandomCharacter(characterSets.symbols);
    }

    while (password.length < length) {
        password += getRandomCharacter(characters);
    }

    password = shufflePassword(password);

    passwordInput.value = password;
    message.textContent = "Password generated successfully.";
    message.style.color = "#16a34a";
}

function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function shufflePassword(password) {
    return password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

async function copyPassword() {
    if (!passwordInput.value) {
        message.textContent = "Generate a password first.";
        message.style.color = "#dc2626";
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        message.textContent = "Password copied to clipboard.";
        message.style.color = "#16a34a";
    } catch {
        passwordInput.select();
        document.execCommand("copy");
        message.textContent = "Password copied to clipboard.";
        message.style.color = "#16a34a";
    }
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

generatePassword();