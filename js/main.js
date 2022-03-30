let app = new Vue({
    el: '.main',
    data:{
        showMain: true,
        showSocial: false,
        showAchievments: false,
        showQuestions: false,
        showResult: false,
        number: 0,
        score:{
            'zerg':0,
            'primal':0,
            'protoss':0,
            'taldarim':0,
            'terran':0,
        },
        totalGame: localStorage.getItem('sc2TotalGame') ? JSON.parse(localStorage.getItem('sc2TotalGame')) : {
            'zerg':0,
            'primal':0,
            'protoss':0,
            'taldarim':0,
            'terran':0,
            'infested':0,
            'hybrid':0,
        },
        totalGames: localStorage.getItem('sc2TotalGames') ? localStorage.getItem('sc2TotalGames') : 0,
        questions: questions,
        results: results,
        resultRace: 'infested', // default race
    },
    methods:{
        goToMain(){
            this.showMain = true;
            this.showSocial = false;
            this.showAchievments = false;
            this.showQuestions = false;
            this.showResult = false;
        },
        goToSocial(){
            this.showMain = false;
            this.showSocial = true;
            this.showAchievments = false;
            this.showQuestions = false;
            this.showResult = false;
        },
        goToAchievments(){
            if (this.totalGames > 0){
                this.showMain = false;
                this.showSocial = false;
                this.showAchievments = true;
                this.showQuestions = false;
                this.showResult = false;
            }else{
                this.goToQuestions();
            }
        },
        goToQuestions(){
            this.score = {
                'zerg':0,
                'primal':0,
                'protoss':0,
                'taldarim':0,
                'terran':0,
            }
            this.showMain = false;
            this.showSocial = false;
            this.showAchievments = false;
            this.showQuestions = true;
            this.showResult = false;
        },
        goToResult(race){
            this.showMain = false;
            this.showSocial = false;
            this.showAchievments = false;
            this.showQuestions = false;
            this.showResult = true;
            this.resultRace = race;
        },
        nextQuestion(answer){
            if (this.number == this.questions.length-1){
                this.number = 0;
                this.endGame();
            }else{
                this.number++;
                eval(answer);
            }
        },
        endGame(){
            this.totalGames++
            localStorage.setItem('sc2TotalGames', this.totalGames)
            // zerg
            if (this.score.zerg > this.score.protoss && this.score.zerg > this.score.terran &&
                this.score.primal < 8 && Math.abs(this.score.protoss - this.score.zerg) > 3){
                this.goToResult('zerg')
                this.totalGame.zerg++
                // starting race
            }else if(this.score.primal > this.score.protoss &&
                this.score.primal > this.score.terran &&
                this.score.primal == 8) {
                this.goToResult('primal')
                this.totalGame.primal++
                // protoss
            }else if (this.score.protoss > this.score.zerg &&
                this.score.protoss > this.score.terran &&
                this.score.taldarim < 5 &&
                Math.abs(this.score.protoss - this.score.zerg) > 3){
                this.goToResult('protoss')
                this.totalGame.protoss++
                // taldarim
            }else if (this.score.protoss > this.score.zerg &&
                this.score.protoss > this.score.terran &&
                this.score.taldarim == 5){
                this.goToResult('taldarim')
                this.totalGame.taldarim++
                // terran
            }else if (this.score.terran > this.score.zerg &&
                this.score.terran > this.score.protoss){
                this.goToResult('terran')
                this.totalGame.terran++
                // hybrid
            }else if (Math.abs(this.score.protoss - this.score.zerg) <= 3){
                this.goToResult('hybrid')
                this.totalGame.hybrid++
            }
            // zarazheniy terran
            else{
                this.goToResult('infested')
                this.totalGame.infested++
            }
            localStorage.setItem('sc2TotalGame', JSON.stringify(this.totalGame));
        },
        showResultRace(race){
            return this.totalGame[race] > 0 ? true : false;
        },

    },
    computed:{
        totalScore(){
            let score = 0
            for(let i in this.totalGame){
                if (this.totalGame[i] > 0){
                    score += this.totalGame[i] * this.results[i]['points']
                }
            }
            return score;
        },
        openedRaces(){
            let count = 0
            for(let i in this.totalGame){
                if (this.totalGame[i] > 0){
                    count++
                }
            }
            return count;
        },
        favoriteRace(){
            let favs = -1, max = 0

            for(let i in this.totalGame){
                if (this.totalGame[i] > 0 && favs == -1 ){
                    favs = i
                    max = this.totalGame[i]
                }else if(this.totalGame[i] > 0 && this.totalGame[i] > max ){
                    favs = i
                    max = this.totalGame[i]
                }
            }

            if (favs == -1){
                return 'No favorite race!';
            }
            return favs;
        }
    }
});