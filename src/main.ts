type Option = 'Piedra' | 'Papel' | 'Tijera' | 'Spock' | 'Lagarto';

const options: Option[] = ['Piedra', 'Papel', 'Tijera', 'Spock', 'Lagarto'];

const rules: Record<Option, Option[]> = {
  Piedra: ['Tijera', 'Lagarto'],
  Papel: ['Piedra', 'Spock'],
  Tijera: ['Papel', 'Lagarto'],
  Spock: ['Piedra', 'Tijera'],
  Lagarto: ['Spock', 'Papel']
};

// Mensajes de razón de victoria
const reasons: Record<string, string> = {
  'Piedra_Tijera': 'Piedra aplasta a Tijera',
  'Piedra_Lagarto': 'Piedra aplasta a Lagarto',
  'Papel_Piedra': 'Papel envuelve a Piedra',
  'Papel_Spock': 'Papel desautoriza a Spock',
  'Tijera_Papel': 'Tijera corta a Papel',
  'Tijera_Lagarto': 'Tijera decapita a Lagarto',
  'Spock_Piedra': 'Spock pulveriza a Piedra',
  'Spock_Tijera': 'Spock rompe Tijera',
  'Lagarto_Spock': 'Lagarto envenena a Spock',
  'Lagarto_Papel': 'Lagarto devora Papel'
};

function getRandomOption(): Option {
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(user: Option, cpu: Option): 'win' | 'lose' | 'draw' {
  if (user === cpu) return 'draw';
  if (rules[user].includes(cpu)) return 'win';
  return 'lose';
}

// Variables de puntaje globales
let userScore = 0, cpuScore = 0;

// Función play global
function play(userChoice: Option) {
  const cpuChoice = getRandomOption();
  let resultText = `Tú: <b>${userChoice}</b> vs CPU: <b>${cpuChoice}</b><br>`;
  const result = getResult(userChoice, cpuChoice);

  let reasonMsg = '';
  if (result === 'draw') {
    resultText += "<span style='color: #888;'>¡Empate!</span>";
  } else if (result === 'win') {
    userScore++;
    resultText += "<span style='color: green;'>¡Ganaste!</span>";
    reasonMsg = reasons[`${userChoice}_${cpuChoice}`] || '';
  } else {
    cpuScore++;
    resultText += "<span style='color: red;'>Perdiste</span>";
    reasonMsg = reasons[`${cpuChoice}_${userChoice}`] || '';
  }
  // Actualiza el DOM
  (document.getElementById('result') as HTMLElement).innerHTML = resultText;
  (document.getElementById('userScore') as HTMLElement).textContent = userScore.toString();
  (document.getElementById('cpuScore') as HTMLElement).textContent = cpuScore.toString();
  (document.getElementById('reason') as HTMLElement).textContent = reasonMsg;
}

// Hacer accesibles las funciones en el navegador
(window as any).getRandomOption = getRandomOption;
(window as any).getResult = getResult;
(window as any).play = play;

