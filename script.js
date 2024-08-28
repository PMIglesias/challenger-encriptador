// Selección de elementos DOM
const inputArea = document.querySelector(".input-box");
const outputArea = document.querySelector(".output-box");
const copyButton = document.querySelector(".copiar");
copyButton.style.display = "none";

// Función para verificar la validez del texto
function checkTextValidity(text) {
  const regex = /^[a-z]+$/;
  if (!regex.test(text)) {
    alert("Por favor, ingrese solo letras minúsculas sin acentos.");
    return false;
  }
  return true;
}

// Función para encriptar texto
function encryptText() {
  const inputText = inputArea.value;
  if (!checkTextValidity(inputText)) return;

  const encryptedText = transformText(inputText, "encrypt");
  displayResult(encryptedText);
}

// Función para desencriptar texto
function decryptText() {
  const inputText = inputArea.value;
  if (!checkTextValidity(inputText)) return;

  const decryptedText = transformText(inputText, "decrypt");
  displayResult(decryptedText);
}

// Función genérica para transformar texto (encriptar o desencriptar)
function transformText(text, mode) {
  const rules = {
    encrypt: [
      ["e", "enter"],
      ["i", "imes"],
      ["a", "ai"],
      ["o", "ober"],
      ["u", "ufat"],
    ],
    decrypt: [
      ["enter", "e"],
      ["imes", "i"],
      ["ai", "a"],
      ["ober", "o"],
      ["ufat", "u"],
    ],
  };

  const ruleSet = mode === "encrypt" ? rules.encrypt : rules.decrypt;
  let transformedText = text;

  ruleSet.forEach(([from, to]) => {
    transformedText = transformedText.split(from).join(to);
  });

  return transformedText;
}

// Función para mostrar el resultado y manejar la interfaz de usuario
function displayResult(resultText) {
  outputArea.value = resultText;
  outputArea.style.backgroundImage = "none";
  inputArea.value = "";
  copyButton.style.display = "block";
}

// Función para copiar texto al portapapeles
function copyToClipboard() {
  if (outputArea.value) {
    navigator.clipboard.writeText(outputArea.value);
    inputArea.value = outputArea.value;
  }
}

// Asignación de funciones a botones
document
  .querySelector(".encrypt-button")
  .addEventListener("click", encryptText);
document
  .querySelector(".decrypt-button")
  .addEventListener("click", decryptText);
copyButton.addEventListener("click", copyToClipboard);
