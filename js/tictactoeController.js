angular
	.module('tictactoeApp') // <-- DO NOT EVER PUT A SEMI COLON HERE!!!
	.controller('TictactoeController', TictactoeController);
				//'UPPERCASE', UPPERCASE
	TictactoeController.$inject = ['$firebaseObject'];

	function TictactoeController($firebaseObject) {

		var self = this;
		self.playerMove = playerMove;
		
		// firebase connection to setup game board
		self.game = (function() {
            var ref = new Firebase("https://my-tictactoe-app.firebaseio.com/game-board");
            var game = $firebaseObject(ref);
            return game;            
        })();

        // fire base connecdtion for players
        self.play = (function() {
        	var ref = new Firebase("https://my-tictactoe-app.firebaseio.com/");
        	var play = $firebaseObject(ref);
        	return play
        })();

		// initial setup of tic-tac-toe game board
		self.getBoxes = (function() {
			for (var i = 0; i < 9; i++) {
				self.game[i] = {whoIsHere: "null"}	
				self.game.$save();
			}
			console.log(self.game);
		})();

		// determines player move and alternate player turn
		function playerMove ($index) {

			// alternate turns
			if (self.play.moveCounter % 2 === 0) {
				self.game[$index].whoIsHere = "pacman";
			}	else {
				self.game[$index].whoIsHere = "ghost";
			}

			console.log(self.play.winningCombo[0])
			console.log(self.play.icons)


			// resets counter
			if (self.play.moveCounter < 9) {
				self.play.moveCounter += 1;	
			}	else {
				self.play.moveCounter = 0;
			}

			// saves and checks logs
			self.play.$save();
			self.game.$save();
			console.log(self.play.moveCounter);
			console.log(self.game[$index].whoIsHere);
			console.log($index);
		}


		// determines winning move

		




	// ASK!!	==> // console.log(self.game.whoIsHere[$index]);

	// .whoIsHere[$index] = "pacman";


	// gets winning combination 

	}
