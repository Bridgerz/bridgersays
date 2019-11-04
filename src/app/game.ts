export class Game {
    redOn: boolean;
    blueOn: boolean;
    yellowOn: boolean;
    greenOn: boolean;

    status = "";
    celebrations = ["Great!", "Nice!", "Keep going!", "Yes!", "Have you done this before?", "Wowie!", "You should go pro!", "Memory of a champ", "You're doing great!", "Keep on trucken!", "Are you cheating?", "Holy cow!" ];
    failures = ["Noooo!", "Oh No!", "Darn!", "Welp...", "You'll get 'em next time", "Better luck next time", "Can't win them all", "Try doing better", "Bugger!", "oof", "I think you need to install more memory", "Get got" ];

    currentClicks: number;
    inGame: boolean;
    lose: boolean;
    busy: boolean;
    Pattern: Array<string>;

    constructor() {
        this.currentClicks = 0;
        this.redOn = false;
        this.blueOn = false;
        this.yellowOn = false;
        this.greenOn = false;
        this.inGame = false;
        this.lose = false;

        this.Pattern = [];

    }

    start() {
        if (this.inGame || this.busy) {
            return;
        }
        this.lose = false;
        this.inGame = true;
        this.currentClicks = 0;
        this.UpdatePattern();
        status = "";
    }

    resetData() {
        this.allOn();
        this.currentClicks = 0;
        this.Pattern = [];
        this.inGame = false;
    }

    reset() {
        if (!this.inGame || this.busy) {
            return;
        }
        this.resetData();
        this.status = "Bye!"
        setTimeout(() => {
            this.status = "";
        }, 750)
    }

    celebrate() {
        var index = Math.floor(Math.random() * (this.celebrations.length - 1))
        this.status = "";
        setTimeout(() => {
            this.status = this.celebrations[index];
        }, 100);
    }

    failure() {
        var index = Math.floor(Math.random() * (this.failures.length - 1))
        this.status = "";
        setTimeout(() => {
            this.status = this.failures[index];
        }, 500);
    }

    choose(color) {
        if (this.busy) {
            return;
        }
        if (this.Pattern[this.currentClicks] != color) {
            this.allOn();
            this.currentClicks = 0;
            this.Pattern = [];
            this.lose = true;
            this.inGame = false;
            this.failure();
            return;
        }
        if (this.currentClicks == this.Pattern.length - 1) {
            this.celebrate();
            this.UpdatePattern();
        }
        else {
            this.currentClicks++;
        }
    }

    UpdatePattern() {
        if (this.Pattern.length > Number(localStorage.getItem("highScore"))){
            localStorage.setItem("highScore", String(this.Pattern.length));
        }
        setTimeout(() => {
            this.status = "";
            this.busy = true;
            this.currentClicks = 0;
            switch (Math.floor((Math.random() * 4) + 1)) {
                case 1: {
                    this.Pattern.push('green');
                    break;
                }
                case 2: {
                    this.Pattern.push('red');
                    break;
                }
                case 3: {
                    this.Pattern.push('yellow');
                    break;
                }
                case 4: {
                    this.Pattern.push('blue');
                    break;
                }
            }
            this.showPattern();
        }, 1200);
    }

    showPattern() {
        for (let i = 0; i < this.Pattern.length; i++) {
            setTimeout(() => {
                switch (this.Pattern[i]) {
                    case "red": {
                        this.redOn = true;
                        break;
                    }
                    case "blue": {
                        this.blueOn = true;
                        break;
                    }
                    case "yellow": {
                        this.yellowOn = true;
                        break;
                    }
                    case "green": {
                        this.greenOn = true;
                        break;
                    }
                }
            }, 1000 * (i + 1));

            setTimeout(() => {
                switch (this.Pattern[i]) {
                    case "red": {
                        this.redOn = false;
                        break;
                    }
                    case "blue": {
                        this.blueOn = false;
                        break;
                    }
                    case "yellow": {
                        this.yellowOn = false;
                        break;
                    }
                    case "green": {
                        this.greenOn = false;
                        break;

                    }
                }
            }, 1000 * (i + 2) - 200);
        }
        setTimeout(() => {
            this.busy = false;
            this.status = "Your turn!"
        }, 1000 * (this.Pattern.length + 1));
        
    }

    rotate() {
        this.busy = true;
        setTimeout(() => this.greenOn = true, 100);
        setTimeout(() => this.redOn = true, 300);
        setTimeout(() => this.blueOn = true, 500);
        setTimeout(() => this.yellowOn = true, 700);

        setTimeout(() => {
            this.greenOn = false;
            this.redOn = false;
            this.blueOn = false;
            this.yellowOn = false;
            this.busy = false;
        }, 1300)
    }

    allOn() {
        this.greenOn = true;
        this.redOn = true;
        this.blueOn = true;
        this.yellowOn = true;
        this.busy = true;

        setTimeout(() => {
            this.greenOn = false;
            this.redOn = false;
            this.blueOn = false;
            this.yellowOn = false;
            this.busy = false;
        }, 1000);
    }
}
