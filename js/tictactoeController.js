angular
	.module('tictactoeApp') // <-- DO NOT EVER PUT A SEMI COLON HERE!!!
	.controller('TictactoeController', TictactoeController);
				//'UPPERCASE', UPPERCASE
	TictactoeController.$inject = ['$firebaseObject'];

	function TictactoeController($firebaseObject) {
		var self = this;
		self.game = (function() {
            var ref = new Firebase("https://tictactoe-app.firebaseio.com/");
            var game = $firebaseObject(ref);
            return game;            
        })();

	// initial setup of tic-tac-toe game board
		// self.boxes = [];
		self.getBoxes = getBoxes();

		function getBoxes() {
			for (var i = 0; i < 9; i++) {			
				self.game.$add({whoIsHere: "ghost"});
			}
		}

	// determines player move and alternate player turn



	// gets winning combination 

	}
