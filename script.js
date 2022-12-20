// variáveis universais
let savedPixelsColors = []; // array que guarda as cores clicadas

// cria div pai da Paleta de Cores
const createColorPalleteContainer = () => {
  const getSectionColorPallete = document.getElementById('sectionColorPallete');
  const addColorPalleteContainer = document.createElement('div');
  getSectionColorPallete.appendChild(addColorPalleteContainer).id = 'color-palette';
};

// REQUISITOS 2 e 3
const createColorPallete = () => {
  const getDivColorPallete = document.getElementById('color-palette');
  for (let index = 0; index < 5; index += 1) {
    const addDivsColors = document.createElement('div');
    getDivColorPallete.appendChild(addDivsColors).className = 'color';
  }
};

const createRandomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
};

// REQUISITOS 3, 4 e 5
const saveColorPallete = () => {
  const getColorPallete = document.getElementsByClassName('color');
  const savedColors = [];
  for (let index = 0; index < getColorPallete.length; index += 1) {
    savedColors.push(getColorPallete[index].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(savedColors));
};

const paintColorPallete = () => {
  const getColors = document.getElementsByClassName('color');
  for (let index = 0; index < getColors.length; index += 1) {
    if (index === 0) {
      getColors[index].style.backgroundColor = 'black';
    } else if (index === 1) {
      getColors[index].style.backgroundColor = 'white';
    }
    else {
      getColors[index].style.backgroundColor = createRandomColor();
    }
  }
  saveColorPallete();
};

// REQUISITO 4
const createBtnRandomColors = () => {
  const getSectionColorPallete = document.getElementById('sectionColorPallete');
  const addDiv = document.createElement('div');
  getSectionColorPallete.appendChild(addDiv).id = 'btnContainer';
  const getBtnContainer = document.getElementById('btnContainer');
  const addBtn = document.createElement('button');
  addBtn.innerHTML = 'Gerar cores aleatórias';
  getBtnContainer.appendChild(addBtn).id = 'button-random-color';
};

const clickBtnRandomColors = () => {
  const clickBtn = document.getElementById('button-random-color');
  clickBtn.addEventListener('click', paintColorPallete);
};

// REQUISITO 5
const getColorPallete = () => {
  const getColor = document.getElementsByClassName('color');
  const getLocalStorage = JSON.parse(localStorage.getItem('colorPalette'));
  for (let index = 0; index < getColor.length; index += 1) {
    getColor[index].style.backgroundColor = getLocalStorage[index];
  }
};

// REQUISITO 6
const artGrid = () => {
  // cria o pixel board
  const getMain = document.getElementById('main');
  const addSection = document.createElement('section');
  getMain.appendChild(addSection).id = 'pixel-board';
  // cria linhas e pixels do pixel board
  const getPixelBoard = document.getElementById('pixel-board');
  // cria linhas
  for (let indexLines = 0; indexLines < 5; indexLines += 1) {
    const addPixelsLines = document.createElement('div');
    getPixelBoard.appendChild(addPixelsLines).className = 'pixel-board-lines';
    // cria pixels
    for (let indexPixels = 0; indexPixels < 5; indexPixels += 1) {
      const getPixelsLines = document.getElementsByClassName('pixel-board-lines')[indexLines];
      const addPixels = document.createElement('div');
      getPixelsLines.appendChild(addPixels).className = 'pixel';
      // addPixels.style.backgroundColor = 'white';
    }
  }
};

// REQUISITO 8
const selectColorBlack = () => {
  const getColor = document.getElementsByClassName('color')[0];
  getColor.className += ' selected';
};

// REQUISITO 9
const selectColor = () => {
// captura cores
  const getColor = document.getElementsByClassName('color');

  // seleciona cor
  for (let index = 0; index < getColor.length; index += 1) {
    getColor[index].addEventListener('click', (event) => {
      const selectedColor = document.querySelector('.selected');
      if (selectedColor) {
        selectedColor.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

// REQUISITO 10 e 12
const paintPixel = () => {
// captura o pixel
  const getPixel = document.getElementsByClassName('pixel');
  for (let index1 = 0; index1 < getPixel.length; index1 += 1) {
    savedPixelsColors.push(getPixel[index1].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savedPixelsColors));
  for (let index = 0; index < getPixel.length; index += 1) { // pinta o pixel
    getPixel[index].addEventListener('click', () => {
      const selectedColor = document.querySelector('.selected');
      if (selectedColor) {
        getPixel[index].style.backgroundColor = selectedColor.style.backgroundColor;
        savedPixelsColors.splice([index], 1, getPixel[index].style.backgroundColor); // substitui valor no array pelo valor clicado
        console.log(savedPixelsColors);
        localStorage.setItem('pixelBoard', JSON.stringify(savedPixelsColors)); // coloca a nova cor no localStorage
      }
    });
  }
};

// REQUISITO 11
// cria botão
const createBtnClearBoard = () => {
  const getBtnContainer = document.getElementById('btnContainer');
  const addBtn = document.createElement('button');
  addBtn.innerHTML = 'Limpar o board';
  getBtnContainer.appendChild(addBtn).id = 'clear-board';
};

// REQUISITO 12
const paintBoard = () => {
  const getPixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < getPixels.length; index += 1) {
    getPixels[index].style.backgroundColor = 'white';
    localStorage.setItem('pixelBoard', getPixels[index]);
  }
};

const savedColors = () => {
  const getPixelsColors = document.getElementsByClassName('pixel');
  const getLocalStorage = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < getPixelsColors.length; index += 1) {
    getPixelsColors[index].style.backgroundColor = getLocalStorage[index];
  }
};

const clickBtnClearBoard = () => {
  const getBtn = document.getElementById('clear-board');
  const getPixels = document.getElementsByClassName('pixel');
  getBtn.addEventListener('click', () => {
    for (let index = 0; index < getPixels.length; index += 1) {
      getPixels[index].style.backgroundColor = 'white';
      localStorage.removeItem('pixelBoard');
      savedPixelsColors.splice([index], 1, getPixels[index].style.backgroundColor); // deixa o array inteiro 'white'
    }
    console.log(savedPixelsColors);
  });
};

// REQUISITO 13
// cria input e botão tamanho do board
const boardSizeInput = () => {
  const getMain = document.getElementById('main');
  const createSectionInput = document.createElement('section');
  getMain.appendChild(createSectionInput).id = 'inputSection';
  // cria input
  const getSectionInput = document.getElementById('inputSection');
  const createInput = document.createElement('input');
  getSectionInput.appendChild(createInput).id = 'board-size';
  document.getElementById('board-size').placeholder = 'tamanho do board';
  document.getElementById('board-size').type = 'number';
  document.getElementById('board-size').min = '1';
  // cria botão
  const createBoardSizeBtn = document.createElement('button');
  getSectionInput.appendChild(createBoardSizeBtn).id = 'generate-board';
  document.getElementById('generate-board').innerHTML = 'Mudar';
};

// Função que muda o tamanho do board
const changeBoardSize = () => {
  const getVQVBtn = document.getElementById('generate-board');
  getVQVBtn.addEventListener('click', () => {
    const getBoardSizeInput = document.getElementById('board-size').value;
    if (getBoardSizeInput === '') {
      alert('Escolha um valor!');
    } else {
      localStorage.removeItem('pixelBoard');
      savedPixelsColors = []; // deixa o array inteiro 'white'
      // remove o pixel board
      const getPixelBoard = document.getElementById('pixel-board');
      const getLines = document.querySelectorAll('.pixel-board-lines');
      for (let indexLines = 0; indexLines < getLines.length; indexLines += 1) {
        getPixelBoard.removeChild(getLines[indexLines]);
      }
      localStorage.removeItem('boardSize');
      localStorage.setItem('boardSize', getBoardSizeInput);
      // limita o número de linhas e pixels em 5
      if (getBoardSizeInput < 5) {
        for (let indexLines = 0; indexLines < 5; indexLines += 1) {
          const addPixelsLines = document.createElement('div');
          getPixelBoard.appendChild(addPixelsLines).className = 'pixel-board-lines';
          // cria pixels
          for (let indexPixels = 0; indexPixels < 5; indexPixels += 1) {
            const getPixelsLines = document.getElementsByClassName('pixel-board-lines')[indexLines];
            const addPixels = document.createElement('div');
            getPixelsLines.appendChild(addPixels).className = 'pixel';
            addPixels.style.backgroundColor = 'white';
          }
        }
        localStorage.removeItem('boardSize');
        localStorage.setItem('boardSize', 5);
        alert('O tamanho mínimo é 5.');
      } else if (getBoardSizeInput > 50) { // limita o número de linhas e pixels em 50
        for (let indexLines = 0; indexLines < 50; indexLines += 1) {
          const addPixelsLines = document.createElement('div');
          getPixelBoard.appendChild(addPixelsLines).className = 'pixel-board-lines';
          // cria pixels
          for (let indexPixels = 0; indexPixels < 50; indexPixels += 1) {
            const getPixelsLines = document.getElementsByClassName('pixel-board-lines')[indexLines];
            const addPixels = document.createElement('div');
            getPixelsLines.appendChild(addPixels).className = 'pixel';
            addPixels.style.backgroundColor = 'white';
          }
        }
        localStorage.removeItem('boardSize');
        localStorage.setItem('boardSize', 50);
        alert('O tamanho máximo é 50.');
      } else {
        // cria linhas e pixels do pixel board
        // cria linhas
        for (let indexLines = 0; indexLines < getBoardSizeInput; indexLines += 1) {
          const addPixelsLines = document.createElement('div');
          getPixelBoard.appendChild(addPixelsLines).className = 'pixel-board-lines';
          // cria pixels
          for (let indexPixels = 0; indexPixels < getBoardSizeInput; indexPixels += 1) {
            const getPixelsLines = document.getElementsByClassName('pixel-board-lines')[indexLines];
            const addPixels = document.createElement('div');
            getPixelsLines.appendChild(addPixels).className = 'pixel';
            addPixels.style.backgroundColor = 'white';
          }
        }
      }
      paintPixel();
    }
  });
};

// Função que recupera o tamanho do board no localStorage
const getBoardSize = () => {
  // cria o pixel board
  const getMain = document.getElementById('main');
  const addSection = document.createElement('section');
  getMain.appendChild(addSection).id = 'pixel-board';
  // cria linhas e pixels do pixel board
  const getPixelBoard = document.getElementById('pixel-board');
  // captura localStorage
  const getBoardSize = localStorage.getItem('boardSize');
  // cria linhas
  for (let indexLines = 0; indexLines < getBoardSize; indexLines += 1) {
    const addPixelsLines = document.createElement('div');
    getPixelBoard.appendChild(addPixelsLines).className = 'pixel-board-lines';
    // cria pixels
    for (let indexPixels = 0; indexPixels < getBoardSize; indexPixels += 1) {
      const getPixelsLines = document.getElementsByClassName('pixel-board-lines')[indexLines];
      const addPixels = document.createElement('div');
      getPixelsLines.appendChild(addPixels).className = 'pixel';
      addPixels.style.backgroundColor = 'white';
    }
  }
};

// =================== //
window.onload = () => {
  createColorPalleteContainer();
  createColorPallete();
  createRandomColor();
  createBtnRandomColors();
  clickBtnRandomColors();
  boardSizeInput();

  if (localStorage.getItem('colorPalette') === null) {
    paintColorPallete();
  } else {
    getColorPallete();
  }

  if (localStorage.getItem('boardSize') === null) {
    artGrid();
  } else {
    getBoardSize();
  }

  changeBoardSize();

  if (localStorage.getItem('pixelBoard') === null) {
    paintBoard();
  } else {
    savedColors();
  }

  selectColorBlack();
  selectColor();
  paintPixel();
  createBtnClearBoard();
  clickBtnClearBoard();
};
