window.addEventListener('load', () => {
  const playerOne = 'X';
  const playerTwo = 'O';

  let turn = playerOne;

  const GAME = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const BOXES = document.querySelectorAll('.box');

  const isFull = () => {
    const CP_BOXES = [...GAME].flat(Infinity);
    const isTotal = CP_BOXES.every(box => box !== null);
    return isTotal;
  }

  const checkGame = () => {

    const checkWinner = (player) => {
      for(let i=0; i<3;i++){
        if( GAME[i][0] === player && GAME[i][1] === player && GAME[i][2] === player){
          return true;
        }
        if( GAME[0][i] === player && GAME[1][i] === player && GAME[2][i] === player){
          return true;
        }
      }
      if( GAME[0][0] === player && GAME[1][1] === player && GAME[2][2] === player){
        return true;
      }
      if( GAME[2][0] === player && GAME[1][1] === player && GAME[0][2] === player){
        return true;
      }

      return false;
    }

    if(checkWinner(playerOne)){
      alert('Jugador 1 Gano con X');
      resetGame();
      return;
    }

    if(checkWinner(playerTwo)){
      alert('Jugador 2 Gano con O');
      resetGame();
      return;
    }

    if( isFull() ){
      alert('Empate');
      resetGame();
      return;
    }

  }

  const resetGame = () => {
    const newGame = GAME.map(row => row.map(()=> null));
    GAME.splice(0, GAME.length, ...newGame);

    BOXES.forEach(box => {
      box.innerHTML = '';
    });

    const randomNumber = Math.round(Math.random());

    turn = randomNumber === 0 ? playerOne: playerTwo;
  };

  BOXES.forEach((box) => {
    box.addEventListener('click', () => {
      const row = box.getAttribute('data-row');
      const column = box.getAttribute('data-col');
      if (GAME[row][column] === null){
        GAME[row][column] = turn;
        box.innerHTML = turn;
        checkGame();
        turn = turn === playerOne ? playerTwo : playerOne;
      }else{
        alert('Esta casilla ya esta marcada. ¡Elige otra!');
      }
      
    });
  });

  
});