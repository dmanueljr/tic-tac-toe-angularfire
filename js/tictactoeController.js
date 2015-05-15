angular
	.module('tictactoeApp') // <-- DO NOT EVER PUT A SEMI COLON HERE!!!
	.controller('TictactoeController', TictactoeController);
				//'UPPERCASE', UPPERCASE
	TictactoeController.$inject = ['$firebaseArray'];

	function TictactoeController($firebaseArray) {
		var self = this;
		self.game = (function() {
            var ref = new Firebase("https://tictactoe-app.firebaseio.com/");
            var game = $firebaseArray(ref);
            return game;            
        })();


	// initial setup of tic-tac-toe game board
		// self.boxes = [];
		self.getBoxes = getBoxes;
		self.playerMove = playerMove;

		function getBoxes() {
			for (var i = 0; i < 9; i++) {			
				self.game.$add({whoIsHere: "empty"});
			}
		}

	// determines player move and alternate player turn
		function playerMove ($index) {
			console.log(self.game[$index].whoIsHere)
			self.game[$index].whoIsHere = "pacman";
			self.game.$save(self.game[$index]);

	// ASK!!	==> // console.log(self.game.whoIsHere[$index]);
			

			// .whoIsHere[$index] = "pacman";
		}


	// gets winning combination 

	}
