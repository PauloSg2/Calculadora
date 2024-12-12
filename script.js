const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Função atualiza o visor
function updateDisplay(value) {
  display.value += value;
}

// Função calcula a expressão
function calculate() {
  const expression = display.value
    .replace(/×/g, '*') // Converte × para *
    .replace(/÷/g, '/') // Converte ÷ para /
    .replace(/,/g, '.'); // Converte vírgulas para pontos

  try {
    // Verifica se a expressão contém caracteres válidos
    if (!/^[\d+\-*/()., ]+$/.test(expression)) {
      throw new Error('Expressão inválida');
    }

    const result = Function(`'use strict'; return (${expression})`)();
    display.value = result.toString().replace('.', ',');
  } catch (error) {
    display.value = 'Erro';
  }
}


// Função limpa o visor
function clearDisplay() {
  display.value = '';
}

// Função manipula parênteses
function handleParentheses() {
  const open = (display.value.match(/\(/g) || []).length;
  const close = (display.value.match(/\)/g) || []).length;

  if (open <= close) {
    updateDisplay('(');
  } else {
    updateDisplay(')');
  }
}

// Eventos botões
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('button-number')) {
      updateDisplay(value);
    } else if (button.classList.contains('button-operation')) {
      updateDisplay(value);
    } else if (button.classList.contains('button-clear')) {
      clearDisplay();
    } else if (button.classList.contains('button-equal')) {
      calculate();
    } else if (button.classList.contains('button-parentheses')) {
      handleParentheses();
    }
  });
});

// Usando o teclado
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    updateDisplay(key === '.' ? ',' : key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  } else if (key === '(' || key === ')') {
    updateDisplay(key);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('welcome-modal');
  const closeButton = document.querySelector('.close-button');

  // Exibir o modal
  modal.style.display = 'block';

  // Fechar o modal
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});
