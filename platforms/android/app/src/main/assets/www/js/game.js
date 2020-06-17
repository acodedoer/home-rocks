class Game{
    constructor(mode, size, playernum, time = 1){
        this.mode = mode;
        this.size = size;
        this.shapes = Util.setShapes(size)
        this.playernum = playernum;
        this.players = []
        this.count = 0;
        this.time = time;
        this.play = {'Random':this.playRandom.bind(this), 'Routed': this.playRouted.bind(this)}
    }

    startGame(){
        this.showInstructions()
    }

    restart(){
        this.clear();
        this.count = 0;
        this.playGame()
    }

    showInstructions(){
        const app = this.clear()
        const back = Util.createBack()
        const next = Util.createNext()
        next.onclick = () => this.createPlayers()
        back.onclick  = () => CreateNew()
        const footer = Util.createFooter(back,next)

        const header = Util.createHeader()
        const heading = Util.createElement('h2', '', 'heading-three-no-space', 'Game setup')
        const list_div = Util.createElement('div', '', 'list-div')
        const shapes_div = Util.createElement('div', '', 'shape-div-instructions')

        this.shapes.forEach(element => {
            const div = document.createElement('div')
            div.appendChild(element.svg)
            div.className ='shape-small'
            shapes_div.appendChild(div)
        });

        const list = document.createElement('ol')
        const inst = []
        inst[0] = document.createElement('li')
        let para0 = document.createElement('p')
        para0.innerText = "Choose someone to hide these shapes."
        inst[0].appendChild(para0)
        inst[0].appendChild(shapes_div)

        inst[1] = document.createElement('li')
        let para1 = document.createElement('p')
        para1.innerText = "Players take turns at finding and snapping the shapes."
        inst[1] = document.createElement('li')
        inst[1].appendChild(para1)
        
        
        Util.appendChildren(list, [inst[0], inst[1]])
        list_div.appendChild(list)

        const div = Util.createElement('div', '', 'div-container-left')
        Util.appendChildren(div, [heading, list_div])
        Util.appendChildren(app, [header, div, footer])
    }

    createPlayers(){
        const app = this.clear()
        const header = Util.createHeader()
        const back = Util.createBack()
        back.onclick = () => this.showInstructions()
        const next = Util.createNext()
        const footer = Util.createFooter(back,next)
        const player = []
        const inputs = []
        const form = Util.createElement('form', '', 'padded-container')
        const frag = document.createDocumentFragment()

        const text = Util.createElement('h2', '', 'heading-three-no-space', `Choose nicknames`)

        const div_text = Util.createElement('div', '', 'heading-div')
        div_text.appendChild(text)

        frag.appendChild(div_text)
        const optionsFrag = document.createDocumentFragment()
        const nicknames = ['', 'Jump', 'Star', 'Xtra', 'Yum', 'Puppy', 'Chimp', 'Blue', 'Pink', 'Tiny', 'Gold', 'ABCD', 'ZZZZ', 'XOXO', 'Dino', 'Ajay', 'Alex', 'Alys', 'Bird', 'Boss', 'Cali', 'Echo', 'Icey', 'Gray', 'Watt', 'York'].sort();
        for(let i = 0; i < this.playernum; i++){
            const label = Util.createElement('p', '', 'form-label', `Player ${i+1}: `)
            label.setAttribute('for', "select"+i)
            label.style.display = "inline"
            const div_label = Util.createElement('div', '', 'label-div')

            inputs[i] = Util.createElement('select');
            inputs[i].id = "select"+i;
            inputs[i].required = true;
            inputs[i].className = "input-name";
            const options = []
            for(let i = 0; i<nicknames.length; i++){
                options[i]= document.createElement('option')
                options[i].setAttribute('value', nicknames[i])
                options[i].innerText = nicknames[i]
                optionsFrag.appendChild(options[i])
            }
            inputs[i].appendChild(optionsFrag)
            player[i] = "";
            inputs[i].onchange = ({target}) => player[i] = target.value //check similar names here
            if(App.utilobj.firstgame == false){
                if(App.utilobj.names[i]!= undefined){
                    inputs[i].value = App.utilobj.names[i]
                    player[i] = App.utilobj.names[i]
                }
            }
            Util.appendChildren(div_label, [label, inputs[i]])
            frag.appendChild(div_label)
        }

        form.appendChild(frag)

        const div = Util.createElement('div', '', 'div-container-left')
        Util.appendChildren(div, [text, form])
        Util.appendChildren(app, [header, div, footer])

        const checkInputs = () =>{
            const names = document.querySelectorAll('select')
            let isCompleted = true;
            let isUnique = true;
            const inputs = []
            names.forEach((el)=>{
                inputs.push(el.value)
                if(el.value === ""){
                    isCompleted = false;
                }
            })
            const unique = [...new Set(inputs)]
            unique.length === inputs.length ? isUnique = true: isUnique = false
            return (isCompleted && isUnique)
        }

        next.onclick = () => {
            if(checkInputs() === true){
                player.forEach((element, index) => {
                    this.players[index] = new Player(element)
                });
                this.playGame()
            }
            else{
                Util.showMessage('Please provide a unique name for each player')
            }
        }
    }

    playGame(){
        if (this.count < this.playernum){
            const app = this.clear()
            const header = Util.createHeader()

            const div_name = Util.createElement('div', 'div_name', 'div-vertical-spacing')
            const name = Util.createElement('h2', '', 'heading-three-no-space', `<span id='player-name'>${(this.players[this.count].name).toUpperCase()}</span>`)
            div_name.appendChild(name)

            const div_ready = Util.createElement('div', 'div_ready', 'div-vertical-spacing')
            const heading_one = Util.createElement('h2', 'ready', 'heading-three-no-space', `Are you Ready?`)
            const msg_one = Util.createElement('p', '', 'text-no-space', 'Find and snap your target shapes')
            Util.appendChildren(div_ready, [heading_one,msg_one])

            const div_steady = Util.createElement('div', 'div_steady', 'div-vertical-spacing')
            const heading_two = Util.createElement('h2', 'steady', 'heading-three-no-space', `Steady`)
            const msg_two = Util.createElement('p', '', 'text-no-space', 'Snap all shapes in the quickest time to win')
            Util.appendChildren(div_steady, [heading_two, msg_two])
            
            const div_container = Util.createElement('div', '', 'div-container-left')
            Util.appendChildren(div_container, [div_name, div_ready, div_steady])

            const next = Util.createFooter('','','Go!')
            next.id = 'div_go'        
            next.onclick = () => {
                if(App.utilobj.firstgame == true){
                const rate = Util.createElement('div', '', '')
                const msg = Util.createElement('p', '', 'p-rate', 'How much fun do you think this game will be?')
                const faces = Util.createElement('div', 'smileys', 'shape-div-instructions')
                for(let i = 1; i<6; i++){
                    const btn = Util.createElement('button', '', 'smiley-button', `<img  class ="image-SVG" src = "img/smiley${i}.svg"/>`)
                    faces.appendChild(btn)
                }
                Util.appendChildren(rate,[msg,faces])
                Util.showMessage(rate, () => this.play[this.mode](this.shapes, this.players[this.count]), true )
            }
            else{
                this.play[this.mode](this.shapes, this.players[this.count])
            }
            }
            Util.appendChildren(app,[header, div_container, next])
        }
    }

    startTimer(size,player){
        
        const timeUp = document.querySelector('#time-up')
        let timer = document.createElement('h2')
        let time = this.time * size;
        timer.className = 'heading-two'
        timer.id = 'game-timer'
        timer.innerText = `${time}`;
        
        let count = () =>{
            if(time>0){
                time-=1;
                timer.innerText = `${time}`;
            }
            else{
                timeUp.play();
                clearInterval(counter)
                player.time = time;
                this.showScore(false)
            }
        }

        const counter = setInterval(count, 1000);
        return [timer, counter]
    }

    setStatus(length, player){
        const [timer, counter] = this.startTimer(length, player)
        const status = Util.createElement('h2', 'game-status', 'heading-two',`0 of ${length} snapped`)
        return[[timer, counter], status]  
    }

    getGameElements(heading = "find and snap"){
        const shape_div = Util.createElement('div', 'shape-div')
        const shape_div_random = Util.createElement('div', 'shape-div-random-centered')
        shape_div.appendChild(Util.createElement('h2', '', 'heading-two', heading))
        const camera = Util.createElement('div', 'camera-div','flex2')
        const scan = Util.createFooter('','','Snap')
        return [shape_div, shape_div_random, camera, scan]
    }

    addShapes(shapes, parent_div){
        shapes.forEach((shape) => {
            const div = Util.createElement('div', 'shape-'+shape.shape, 'shape')
            div.appendChild(shape.svg)
            parent_div.appendChild(div)
        });
    }

    playRandom(shapes, player){
        const correctSound = document.querySelector('#correct-scan')
        const wrongSound = document.querySelector('#wrong-scan')
        const snapClick = document.querySelector('#snap')
        const timerStarted = document.querySelector('#timer-started')
        const levelComplete = document.querySelector('#level-complete')

        let scanning = false;

        window.plugins.insomnia.keepAwake()
        const app = this.clear()
        let count = 0;
        let found = []
        player.score = 0;
        const [[timer, counter], status] = this.setStatus(shapes.length, player)
        const [shape_div, shape_div_random, camera, scan] = this.getGameElements()
        setupCamera();

        app.appendChild(status)
        app.appendChild(timer)

        
        this.addShapes(shapes, shape_div_random)
        shape_div.appendChild(shape_div_random)

        app.appendChild(shape_div)
        app.appendChild(camera)
        scan.onclick = ({target}) => {
            if(scanning!=true){
            snapClick.play();
            scanning = true;
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snapping...</h2>`
            ClassifyImage().then((result)=>{
            if((shapes.find(item => item.shape == result[0].label) !== undefined) && (found.indexOf(result[0].label) === -1)){
                if(count < shapes.length - 1){
                    correctSound.play()
                }
                found.push(result[0].label)
                const id = `shape-${result[0].label}`
                let shape_found = document.getElementById(id)
                shape_found.classList.toggle('found-shape');
                shape_found.addEventListener("transitionend", ()=> {shape_found.style.display = 'none'});
                player.score += 1;
                if(count < shapes.length - 1){
                    count += 1
                    status.innerText = `${count} of ${shapes.length} snapped`
                }
                else{
                    levelComplete.play();
                    clearInterval(counter)
                    player.time = timer.innerText
                    this.showScore(true)
                }
            }
            else{
                wrongSound.play()
            }
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snap</h2>`
            scanning = false;
        }).catch((e)=> {
            wrongSound.play()
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snap</h2>`
            scanning = false;
        })}}

        timerStarted.play();
        app.appendChild(scan)

    }

    playRouted(shapes, player){
        window.plugins.insomnia.keepAwake()
        const app = this.clear()
        const correctSound = document.querySelector('#correct')
        const wrongSound = document.querySelector('#wrong')
        let count = 0;
        player.score = 0;
        const [[timer, counter], status] = this.setStatus(shapes.length, player)
        const [shape_div, shape_div_random, camera, scan] = this.getGameElements("find and snap")
        setupCamera();

        this.addShapes([shapes[count]], shape_div_random)
        shape_div.appendChild(shape_div_random)

        app.appendChild(status)
        app.appendChild(timer)
        app.appendChild(shape_div)
        app.appendChild(camera)

        scan.onclick = () => {
            scan.disabled = true;
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snapping...</h2>`
            ClassifyImage().then((result)=>{
            if(shapes[count].shape == result[0].label){
                correctSound.play()
                const id = `shape-${result[0].label}`
                const shape_found = document.getElementById(id)
                shape_found.classList.toggle('found-shape');
                shape_found.addEventListener("transitionend", ()=> {
                    shape_found.style.display='none'        
                    if(count < shapes.length - 1){
                        if(count < shapes.length - 1){
                            count += 1
                            this.addShapes([shapes[count]], shape_div_random)
                            status.innerText = `${count} of ${shapes.length} snapped`}
                    }
                });
                player.score += 1;
                if(count >= shapes.length - 1){
                    clearInterval(counter)
                    player.time = timer.innerText
                    this.showScore(true)
                }
            }
            else{
                wrongSound.play()
                // shape_div_random.classList.add('wrong-scan')
                // const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
                // shape_div_random.addEventListener("animationend", onAnimationEnd)
            }
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snap</h2>`
            scan.disabled = false;
        }).catch((e)=> {
            wrongSound.play()
            // shape_div_random.classList.add('wrong-scan')
            // const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
            // shape_div_random.addEventListener("animationend", onAnimationEnd)
            scan.innerHTML = `<h2 class='heading-two-no-space'>Snap</h2>`
            scan.disabled = false;
        })}
  
        app.appendChild(scan)
    }

    showScore(completed){
        window.plugins.insomnia.allowSleepAgain()
        document.addEventListener("resume", onResume, false);
        function onResume() {
            CameraPreview.hide()
        }
        let app = this.clear()
        let player = this.players[this.count]
        this.count+=1;

        let title = ""
        if(completed == true){
            title = "Great Job!"
        }
        else{
            title = "Game Over"
        }
        const header = Util.createHeader(title)
        const para = Util.createElement('p', 'heading-three-no-space', 'centered-p', `<span><h2 id='player-name'>${player.name.toUpperCase()}</h2>Snapped shape(s): ${player.score}<br/> Seconds left: ${player.time}<br> Points Scored: ${Number(player.score * 1000) + Number(player.time)}</span>`)
        player.score = Number(player.score * 1000) + Number(player.time)

        let next
        if(this.count < this.playernum){    
            next = Util.createFooter('','',`${this.players[this.count].name.toUpperCase()}'s Turn`)
            next.onclick = () => {
                document.removeEventListener("resume", onResume, false);
                this.playGame()
            }
        }
        else{
            next = Util.createFooter('','','Results')
            next.onclick = () => {
                document.removeEventListener("resume", onResume, false);
                this.showRankings()
            }
        }

        Util.appendChildren(app, [header,para,next])
        if(App.utilobj.firstgame == true){
            const rate = Util.createElement('div', '', '')
            const msg = Util.createElement('p', '', 'p-rate', 'How much fun was the game?')
            const faces = Util.createElement('div', 'smileys', 'shape-div-instructions')
            for(let i = 1; i<6; i++){
                const btn = Util.createElement('button', '', 'smiley-button', `<img  class ="image-SVG" src = "img/smiley${i}.svg"/>`)
                faces.appendChild(btn)
            }
            Util.appendChildren(rate,[msg,faces])
            Util.showMessage(rate, '', true)
        }
    }

    showRankings(){
        const app = this.clear()
        const resultsDisplayed = document.querySelector('#results-displayed')
        const heading = Util.createHeader('Results')
        const rankings = document.createElement('table')
        const rankedPlayers =this.players.sort(function(a, b){return b.score-a.score});
        rankedPlayers.forEach(player=>{
            const tr = document.createElement('tr')
            const tdname = Util.createElement('td', '', '', `${player.name}:`)
            const tdscore = Util.createElement('td', '', '', `${player.score} points`)
            Util.appendChildren(tr, [tdname, tdscore])
            rankings.appendChild(tr)
        })
        let winners = []
        winners = rankedPlayers.filter((el)=> el.score==rankedPlayers[0].score)

        let winner
        if(winners.length>1){
            winner = Util.createElement('h2', 'winner-name','heading-two', `Draw!`)
        }
        else{
            winner = Util.createElement('h2', 'winner-name','heading-two', `${rankedPlayers[0].name.toUpperCase()} won!`)
        }
        const winner_div = Util.createElement('div', '', 'winner-div')
        winner_div.appendChild(winner)
        winner_div.style.height= '3em'

        const replay = Util.createFooter('', '', 'Replay')
        //https://play.google.com/store/apps/details?id=com.chici.homerocks
        replay.onclick = () => {
            App.utilobj.names = []; 
            for(let i =0; i<this.players.length;i++){App.utilobj.names.push(this.players[i].name); App.utilobj.mode = this.mode; App.utilobj.size = this.size; App.utilobj.players = this.playernum; }
            this.clear(); 
            CreateNew()
            reviewcount+=1;
            if(App.utilobj.review =! true){
                if(App.utilobj.reviewcount>=2){
                    Util.showMessage('Would you like to review this game?', ()=>{app.removeChild(document.getElementsByClassName('modal')); window.open('https://play.google.com')})
                    reviewcount = 0;
                }
            }
        }

        const feedback = Util.finalFeedback();
        resultsDisplayed.play();
        Util.appendChildren(app, [heading, winner_div, rankings, feedback, replay])
        App.utilobj.firstgame = false;
    }

    clear(){
        let app = document.querySelector('.app');
        app.innerHTML = ""
        CameraPreview.hide()
        return app;
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
        this.time = 0;
    }

    setScore(score){
        this.score = score;
    }
}