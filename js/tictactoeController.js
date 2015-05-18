angular
	.module('tictactoeApp') // <-- DO NOT EVER PUT A SEMI COLON HERE!!!
	.controller('TictactoeController', TictactoeController);
				//'UPPERCASE', UPPERCASE
	TictactoeController.$inject = ['$firebaseObject'];

	function TictactoeController($firebaseObject) {

		var self = this;
		
		// firebase connection to setup game board
		self.game = (function() {
            var ref = new Firebase("https://my-tictactoe-app.firebaseio.com/game-board");
            var game = $firebaseObject(ref);
            return game;            
        })();

        // fire base connection for play rules
        self.play = (function() {
        	var ref = new Firebase("https://my-tictactoe-app.firebaseio.com/");
        	var play = $firebaseObject(ref);
        	return play
        })();

		// initial setup of tic-tac-toe game board
		self.getBoxes = (function() {
			for (var i = 0; i < 9; i++) {
				self.game[i] = {whoIsHere: "null"};
				self.game.$save();
			}
			// console.log(self.game);
		})();

		// sets counter
		self.setCounter = (function() {
			if (self.play.moveCounter < 9) {
				self.play.moveCounter += 1;	
			}	else {
				self.play.moveCounter = 0;
			}			
		});

		// validate player move
		self.validateMove = (function($index) {

			// alternate turns
			if (self.play.moveCounter % 2 === 0) {
				self.game[$index].whoIsHere = "pacman";
			}	else {
				self.game[$index].whoIsHere = "ghost";
			}

			self.setCounter();
		});


		// clears board and counter
		self.resetBoard = (function() {
			for (var i = 0; i < 9; i++) {
				self.game[i] = {whoIsHere: "null"};
			}
			self.game.$save;
			self.play.moveCounter = 0;
		});


		// tallies player scores
		self.getScore = (function(x) {

			// assigns score to winning player
			if (x == "pacman") {
				self.play.p1Score += 1;
			}	else {
				self.play.p2Score += 1;
			}


			self.resetBoard();			

			// resets board if game series not over
//			// if (self.play.p1Score < 5 && self.play.p2Score < 5) {

			// }
		});


		// checks boxes for winning combination
		self.getWinner = (function() {
			for (i = 0; i < self.play.icons.length; i++) {
				var t = self.play.icons[i];
				// console.log(t);
				for (x = 0; x < self.play.winningCombo.length; x++) {
					var w = self.play.winningCombo[x];
					// console.log(w[1])
					// console.log(self.game[w[0]])
					// console.log(self.game[w[1]].whoIsHere)
					if (self.game[w[0]].whoIsHere == t && self.game[w[1]].whoIsHere == t && self.game[w[2]].whoIsHere == t) {

						// alert(self.play.winner)
						self.play.winner = t + " wins!";
						self.getScore(t);

						// alert(t);
						//resets moveCounter and saves
						// self.play.moveCounter = 0;
						self.play.$save;
					}	
				}
			}
		});

		// determines player move and alternate player turn
		self.playerMove = (function($index) {

			// checks empty box for valid turn
			if (self.game[$index].whoIsHere == "null") {
				self.validateMove($index);
				self.getWinner();
			}	else	{
				alert("not a valid move");
			}


			// saves and checks logs
			self.play.$save();
			self.game.$save();

		})

		
		

		

			// console.log(self.play.moveCounter);
			// console.log(self.game[$index].whoIsHere);
			// console.log($index);
			// checks access to winningCombo and icons in firebase
			// console.log("winningCombo length is: " + self.play.winningCombo.length)
			// console.log("icons length is: " + self.play.icons.length)
			// console.log(self.play.winningCombo[0])
			// console.log(self.play.icons)

	// ASK!!	==> // console.log(self.game.whoIsHere[$index]);

	// .whoIsHere[$index] = "pacman";


	}
