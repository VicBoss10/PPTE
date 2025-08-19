type Option = 'Piedra' | 'Papel' | 'Tijera' | 'Spock' | 'Lagarto';

const options: Option[] = ['Piedra', 'Papel', 'Tijera', 'Spock', 'Lagarto'];

const rules: Record<Option, Option[]> = {
  Piedra: ['Tijera', 'Lagarto'],
  Papel: ['Piedra', 'Spock'],
  Tijera: ['Papel', 'Lagarto'],
  Spock: ['Piedra', 'Tijera'],
  Lagarto: ['Spock', 'Papel']
};

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

const imageMap: Record<Option, string> = {
  Piedra: '../assets/3.gif',
  Papel: '../assets/5.gif',
  Tijera: '../assets/2.gif',
  Spock: '../assets/1.gif',
  Lagarto: '../assets/4.gif'
};
const drawImage = '../assets/6.gif';

function getRandomOption(): Option {
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(user: Option, cpu: Option): 'win' | 'lose' | 'draw' {
  if (user === cpu) return 'draw';
  if (rules[user].includes(cpu)) return 'win';
  return 'lose';
}

let userScore = 0, cpuScore = 0;

function play(userChoice: Option) {
  const cpuChoice = getRandomOption();
  let resultText = `Tú: <b>${userChoice}</b> vs CPU: <b>${cpuChoice}</b><br>`;
  const result = getResult(userChoice, cpuChoice);

  let reasonMsg = '';
  let winner: Option | null = null;

  if (result === 'draw') {
    resultText += "<span style='color: #888;'>¡Empate!</span>";
    reasonMsg = '';
  } else if (result === 'win') {
    userScore++;
    resultText += "<span style='color: green;'>¡Ganaste!</span>";
    reasonMsg = reasons[`${userChoice}_${cpuChoice}`] || '';
    winner = userChoice;
  } else {
    cpuScore++;
    resultText += "<span style='color: red;'>Perdiste</span>";
    reasonMsg = reasons[`${cpuChoice}_${userChoice}`] || '';
    winner = cpuChoice;
  }

  (document.getElementById('result') as HTMLElement).innerHTML = resultText;
  (document.getElementById('userScore') as HTMLElement).textContent = userScore.toString();
  (document.getElementById('cpuScore') as HTMLElement).textContent = cpuScore.toString();
  (document.getElementById('reason') as HTMLElement).textContent = reasonMsg;

  // Mostrar solo la imagen del ganador o la de empate
  const imgDiv = document.getElementById('img-result');
  if (imgDiv) {
    if (result === 'draw') {
      imgDiv.innerHTML = `
        <div style="margin-top:12px;">
          <img src="${drawImage}" alt="Empate" style="height:300px;">
        </div>
      `;
    } else if (winner) {
      imgDiv.innerHTML = `
        <div style="margin-top:12px;">
          <img src="${imageMap[winner]}" alt="${winner}" style="height:300px;">
        </div>
      `;
    } else {
      imgDiv.innerHTML = '';
    }
  }
}

// Hacer accesibles las funciones en el navegador
(window as any).getRandomOption = getRandomOption;
(window as any).getResult = getResult;
(window as any).play = play;

