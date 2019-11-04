import { Component, ViewChild, HostListener } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimonSays';
  Game: Game;
  gameWidth: number;
  gameHeight: number;

  constructor() {
    this.Game = new Game();
    this.gameWidth = window.innerWidth - 75;
    this.gameHeight = this.gameWidth;
    if (!localStorage.getItem("highScore")){
      localStorage.setItem("highScore", "0");
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gameWidth = window.innerWidth - 75;
    this.gameHeight = this.gameWidth;
  }

  highScore(){
    var score = localStorage.getItem("highScore");
    alert("Your high score is " + score);
  }

  getOpacity(light) {
    if (light) {
      return 1;
    }
    return .5;
  }

  ngOnInit() {
    this.Game.rotate();
  }

  reset() {
    if (this.Game.inGame) {
      this.Game.inGame = false;
    }
  }

  pressButton(color) {
    if(this.Game.busy){
      return;
    }
    switch (color) {
      case "red": {
        this.Game.redOn = true;
        setTimeout(() => {
          this.Game.redOn = false;
          this.Game.choose('red');
        }, 500);

        break;
      }
      case "blue": {
        this.Game.blueOn = true;
        setTimeout(() => {
          this.Game.blueOn = false;
          this.Game.choose('blue');
        }, 500);
        break;
      }
      case "yellow": {
        this.Game.yellowOn = true;
        setTimeout(() => {
          this.Game.yellowOn = false;
          this.Game.choose('yellow');
        }, 500);
        break;
      }
      case "green": {
        this.Game.greenOn = true;
        setTimeout(() => {
          this.Game.greenOn = false;
          this.Game.choose('green');
        }, 500);
        break;

      }
    }
  }
}

