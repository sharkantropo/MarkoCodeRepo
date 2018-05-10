/*jshint esversion: 6 */
var tic_tac =
  {
    //this.gen_square copies the entire current state board to an array.
    gen_square: function (square) {
      square.length = 0;
      let square_label;
      for (var i = 0; i < 9; i++) {
        square_label = $('#square_' + i);
        square.push(square_label.html());
      }
      return square;
    },
    //this.reset_square cleans previous board state.
    reset_square: function () { $('.xosquare').text('-'); },
    //A method to check a victory state
    check_vict_cond: function (board, arrS) {
      if (arrS[board[0]] !== '-') {
        if (arrS[board[0]] == arrS[board[1]] && arrS[board[0]] == arrS[board[2]]) {
          return arrS[board[0]];
        }
      }
      return false;
    },
    matchvictor: function (curArr) {
      for (let index = 0; index < win_comb.length; index++) {
        if (this.check_vict_cond(win_comb[index], curArr) == 'O') {
          return -10;
        }
        else if (this.check_vict_cond(win_comb[index], curArr) == 'X') {
          return 10;
        }
      }
      for (let index = 0; index < curArr.length; index++) {
        if (curArr[index] == '-') {
          return "Still on Play";
        }
      }
      return 0;
    },
    //Method below includes recursive minmax calculation. Predicts next AI's move.
    next_board: function () {
      var recurBoard = grid_square.slice(0, 9), deep = 0, state, turn = pChar;
      let oriBoard = grid_square.slice(0, 9);
      for (let index = 0; index < recurBoard.length; index++) {
        if (recurBoard[index] == "-") {
          recurBoard[index] = pChar;
          turn = pChar;
          if (this.terminal_state(recurBoard)) {
            game_ended = true;
            break;
          }
          state = recursArr(recurBoard);
          grid_square[index] = state;
        }
        recurBoard = oriBoard.slice(0, 9);
        deep = 0;
      }
      function recursArr(boardO) {
        deep++;
        let auxArr = [], matched;
        turn = turn == pChar ? turn = playerChar : turn = pChar;
        for (let j = 0; j < boardO.length; j++) {
          if (boardO[j] == '-') {
            auxArr = boardO.slice(0, 9);
            auxArr[j] = turn;
            matched = tic_tac.matchvictor(auxArr);
            if (matched == 10) {
              return 10 - deep;
            }
            else if (matched == -10) {
              return deep - 10;
            }
            else if (matched == 0) {
              return 0;
            }
          }
          else {
            continue;
          }
        }
        return recursArr(auxArr);
      }
    },
    // IA_play determines which position on the board the AI will put its play.
    IA_play: function () {
      let predArr, ai_pick;
      predArr = this.plays_finder();
      if (predArr.length > 1) 
      {
        if (predArr[1]%2!=0) 
        {
          ai_pick = predArr[Math.floor(Math.random() * predArr.length)];
          return ai_pick;
        }
        predArr=predArr.filter(el=> el%2 == 0);
        ai_pick = predArr[Math.floor(Math.random() * predArr.length)];
        return ai_pick;
      }
      else {
        return predArr;
      }
    },
    plays_finder: function () {
      let argms = [], aux;
      if (pChar == "X") {
        aux = -99;
        grid_square.forEach((element, index) => {
          if (element > aux) {
            aux = element;
          }
        });
        grid_square.forEach((element, index, arrAux) => {
          if (element == aux) {
            argms.push(index);
          }
        });
        return argms;
      }
      else {
        aux = 99;
        grid_square.forEach((element, index) => {
          if (element < aux) {
            aux = element;
          }
        });
        grid_square.forEach((element, index, arrAux) => {
          if (element == aux) {
            argms.push(index);
          }
        });
        return argms;
      }
    },
    terminal_state: function (evalArr) {
      let term_state = this.matchvictor(evalArr);
      if (term_state == -10 || term_state == 10) {
        this.draw_array(evalArr);
        $('.upperText').text('You lose!');
        flag = 0;
        setTimeout(function () { tic_tac.reset_square(); $('.upperText').text('Play ON'); flag = 1; }, 1500);
        return true;
      }
      else if (term_state == 0) 
      {
        flag=0;
        this.draw_array(evalArr);
        $("#testina").text("Draw!");
        setTimeout(function () { tic_tac.reset_square(); $('.upperText').text('Play ON'); flag = 1; }, 1500);
        return true;
      }
      return false;
    },
    draw_array: function (dArr) {
      let square_brd;
      dArr.forEach((element, index) => {
        square_brd = $('#square_' + index);
        square_brd.text(element);
      });
    }
  };
var win_comb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var grid_square = [], game_ended = false;
var flag = 1;
var playerChar, pChar, aindex;

$(document).ready(function () {

  $('.upperText').text('Play ON');

  $(".selected").click(function () {
    playerChar = $(this).text();
    pChar = playerChar == 'X' ? pChar = 'O' : pChar = 'X';
    $(".overlay,.player_selector").fadeOut('slow');
  });

  $('.xosquare').click(function () {
    game_ended = false;
    if ($(this).text() == '-' && flag == 1) {
      $(this).text(playerChar);
      grid_square = tic_tac.gen_square(grid_square);
      if (tic_tac.terminal_state(grid_square)) 
      {
        return undefined;
      }
      tic_tac.next_board();
      if (!(game_ended)) {
        aindex = tic_tac.IA_play();
        $("#square_" + aindex).text(pChar);
      }
    }
    else { return null; }
  });

  $('.reset_button').click(function () { tic_tac.reset_square(); $('.upperText').text('Play ON'); flag = 1; game_ended = false; });
});