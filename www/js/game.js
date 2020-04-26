class Game{
    constructor(mode, size, playernum, time = 30){
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
        let app = this.clear()
        let heading = document.createElement('h1')
        heading.className = "heading-two"
        heading.innerText = "How to Setup the Game"
        let list_div = document.createElement('div');
        list_div.className = 'list-div'

        let shapes_div = document.createElement('div')
        shapes_div.className = "shape-div-instructions"

        this.shapes.forEach(element => {
            let div = document.createElement('div')
            div.appendChild(element.svg)
            div.className ='shape-small'
            shapes_div.appendChild(div)
        });

        let list = document.createElement('ol')
        let inst = []
        inst[0] = document.createElement('li')
        let para0 = document.createElement('p')
        para0.innerText = "Draw each of the following shapes on a plane white sheet of paper (you can also download and print each shape  from the chici website)."
        inst[0].appendChild(para0)
        inst[0].appendChild(shapes_div)

        inst[1] = document.createElement('li')
        let para1 = document.createElement('p')
        para1.innerText = "Hide each drawn or printed shape in a clever place around the house."
        inst[1] = document.createElement('li')
        inst[1].appendChild(para1)

        inst[2] = document.createElement('li')
        let para2 = document.createElement('p')
        para2.innerText = "Press continue to enter the names of players. Then have the players take turns in finding and scanning the hidden shapes. The player that scans the most shapes in the least amount of time wins."
        inst[2] = document.createElement('li')
        inst[2].appendChild(para2)
        
        
        list.appendChild(inst[0])
        list.appendChild(inst[1])
        list.appendChild(inst[2])

        list_div.appendChild(list)

        let div = document.createElement('div')
        let next = document.createElement('button')
        div.className ='div-container'
        next.innerText = 'Next';
        div.appendChild(heading)
        div.appendChild(list_div)
        div.appendChild(next)
        app.appendChild(div)
        next.onclick = () => this.createPlayers()
    }

    createPlayers(){
        let app = this.clear()
        let player = []
        let inputs = []
        let form = document.createElement('form')
        let frag = document.createDocumentFragment()

        let text = document.createElement('h1')
        text.className = 'heading-two'
        text.innerText = "Name Player"

        let div_text = document.createElement('div')
        div_text.appendChild(text)
        div_text.className ='heading-div'

        frag.appendChild(div_text)

        for(let i = 0; i < this.playernum; i++){
            let label = document.createElement('h3')
            label.className = 'form-label'
            label.innerText = `Player ${i+1}`

            let div_label = document.createElement('div')
            div_label.appendChild(label)
            div_label.className ='label-div'

            inputs[i] = document.createElement('input');
            inputs[i].setAttribute('type', 'text')
            inputs[i].required = true;
            inputs[i].className = "input-name";
            inputs[i].onchange = ({target}) => player[i] = target.value //check similar names here
            frag.appendChild(div_label)
            frag.appendChild(inputs[i])
        }

        
        let next = document.createElement('button')
        next.innerText = 'Next';
        form.appendChild(frag)
        app.appendChild(form)
        app.appendChild(next)

        const checkInputs = () =>{
            const names = document.querySelectorAll('input')
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
            const div = Util.createElement('div', '', 'div-container')
            const header = Util.createElement('h2', '', 'heading-two', `Get Ready ${this.players[this.count].name}`)
            const inst = Util.createElement('p', '', '', 'Find and scan all your target shapes as quickly as possible. You win if you scan more shapes than you opponents in less time.<br/>Press "Start" to begin.')
            inst.style.textAlign = 'left'
            Util.appendChildren(div, [header, inst])
            const next = Util.createElement('button', '', '', `Start`)        
            next.onclick = () => {
                const rate = Util.createElement('div', '', '')
                const msg = Util.createElement('p', '', 'p-rate', 'How much fun do you think this game will be?')
                const faces = Util.createElement('div', '', 'shape-div-instructions')
                for(let i = 1; i<6; i++){
                    const btn = Util.createElement('div', '', 'shape-small', `<img  class ="image-SVG" src = "img/sm${i}.svg"/>`)
                    faces.appendChild(btn)
                }
                Util.appendChildren(rate,[msg,faces])
                Util.showMessage(rate, () => this.play[this.mode](this.shapes, this.players[this.count]), true )
            }
            Util.appendChildren(app,[div, next])
        }
    }

    startTimer(size,player){
        let timer = document.createElement('h2')
        let time = this.time * size;
        let current = 0
        timer.className = 'heading-two'
        timer.id = 'game-timer'
        timer.innerText = `${time}`;
        
        let count = () =>{
            if(current<time){
                current+=1;
                timer.innerText = `${current}`;
            }
            else{
                clearInterval(counter)
                player.time = current;
                this.showScore(player.score)
            }
        }

        const counter = setInterval(count, 1000);
        return [timer, counter]
    }

    setStatus(length, player){
        const [timer, counter] = this.startTimer(length, player)
        const status = Util.createElement('h1', 'game-status', 'heaing-two',`0 of ${length}`)
        return[[timer, counter], status]  
    }

    getGameElements(heading = "Shapes to scan"){
        const shape_div = Util.createElement('div', 'shape-div')
        const shape_div_random = Util.createElement('div', 'shape-div-random')
        shape_div.appendChild(Util.createElement('h2', '', 'heading-two', heading))
        const camera = Util.createElement('div', 'camera-div','flex2')
        const scan_div = Util.createElement('div', 'scan-div')
        const scan = Util.createElement('button', '', '', "Scan")
        scan_div.appendChild(scan)
        return [shape_div, shape_div_random, camera, scan_div, scan]
    }

    addShapes(shapes, parent_div){
        shapes.forEach((shape) => {
            const div = Util.createElement('div', 'shape-'+shape.shape, 'shape')
            div.appendChild(shape.svg)
            parent_div.appendChild(div)
        });
    }

    playRandom(shapes, player){
        window.plugins.insomnia.keepAwake()
        const app = this.clear()
        let count = 0;
        let found = []
        player.score = 0;
        const [[timer, counter], status] = this.setStatus(shapes.length, player)
        const [shape_div, shape_div_random, camera, scan_div, scan] = this.getGameElements()
        setupCamera();

        app.appendChild(status)
        app.appendChild(timer)

        
        this.addShapes(shapes, shape_div_random)
        shape_div.appendChild(shape_div_random)

        app.appendChild(shape_div)
        app.appendChild(camera)

        scan.onclick = async ({target}) => {
            target.disabled = true;
            target.innerText = "Scanning..." 
            ClassifyImage().then((result)=>{
            if((shapes.find(item => item.shape == result[0].label) !== undefined) && (found.indexOf(result[0].label) === -1)){
                found.push(result[0].label)
                let shape_found = document.getElementById(`shape-${result[0].label}`)
                shape_found.classList.toggle('found-shape');
                shape_found.addEventListener("transitionend", ()=> {console.log('transition ended');document.getElementById('shape-div-random').removeChild(shape_found)});
                player.score += 1;
                if(count < shapes.length - 1){
                    count += 1
                    status.innerText = `${count} of ${shapes.length}`
                }
                else{
                    clearInterval(counter)
                    player.time = timer.innerText
                    this.showScore(player)
                }
            }
            else{
                shape_div_random.classList.add('wrong-scan')
                const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
                shape_div_random.addEventListener("animationend", onAnimationEnd)
            }
            target.innerText = "Scan"
            target.disabled = false;
        }).catch((e)=> {
            shape_div_random.classList.add('wrong-scan')
            const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
            shape_div_random.addEventListener("animationend", onAnimationEnd)
        target.innerText = "Scan"
            target.disabled = false;
            console.log(e);
        })}

        app.appendChild(scan_div)

    }

    playRouted(shapes, player){
        window.plugins.insomnia.keepAwake()
        const app = this.clear()
        let count = 0;
        player.score = 0;
        const [[timer, counter], status] = this.setStatus(shapes.length, player)
        const [shape_div, shape_div_random, camera, scan_div, scan] = this.getGameElements("Next shape")
        setupCamera();

        this.addShapes([shapes[count]], shape_div_random)
        shape_div.appendChild(shape_div_random)

        app.appendChild(status)
        app.appendChild(timer)
        app.appendChild(shape_div)
        app.appendChild(camera)

        scan.onclick = async ({target}) => {
            target.disabled = true;
            target.innerText = "Scanning..." 
            ClassifyImage().then((result)=>{
            console.log('Shape: ', shapes[count].shape)
            console.log('Scan: ',result[0].label )
            if(shapes[count].shape == result[0].label){
                console.log('Correct Scan')
                const shape_found = document.getElementById(`shape-${result[0].label}`)
                shape_found.classList.toggle('found-shape');
                shape_found.addEventListener("transitionend", ()=> {document.getElementById('shape-div-random').removeChild(shape_found);                if(count < shapes.length - 1){
                    if(count < shapes.length - 1){
                        count += 1
                        this.addShapes([shapes[count]], shape_div_random)
                        status.innerText = `${count} of ${shapes.length}`}
                }});
                player.score += 1;
                if(count >= shapes.length - 1){
                    clearInterval(counter)
                    player.time = timer.innerText
                    this.showScore(player)
                }
            }
            else{
                console.log('Wrong Scan')
                shape_div_random.classList.add('wrong-scan')
                const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
                shape_div_random.addEventListener("animationend", onAnimationEnd)
            }
            target.innerText = "Scan"
            target.disabled = false;
        }).catch((e)=> {
            shape_div_random.classList.add('wrong-scan')
            const onAnimationEnd = () => {shape_div_random.removeEventListener("animationend",onAnimationEnd);shape_div_random.classList.remove('wrong-scan')}
            shape_div_random.addEventListener("animationend", onAnimationEnd)
            target.innerText = "Scan"
            target.disabled = false;
            console.log(e);
        })}
  
        app.appendChild(scan_div)
    }

    showScore(){
        window.plugins.insomnia.allowSleepAgain()
        let app = this.clear()
        let player = this.players[this.count]
        this.count+=1;

        const header = Util.createElement('h1', '', 'heading-two', `${player.name}'s Score`)
        const para = Util.createElement('p', '', '', `You found ${player.score} out of ${this.size} shapes in ${player.time} seconds`)

        let next = document.createElement('button')
        if(this.count < this.playernum){    
            next.innerText = 'Next Player'
            next.onclick = () => {
                this.playGame()
            }
        }
        else{
            next.innerText = 'Rankings'
            next.onclick = () => {
                this.showRankings()
            }
        }

        Util.appendChildren(app, [header,para,next])
    }

    showRankings(){
        const app = this.clear()
        const heading = Util.createElement('h1', '', 'heading-two', 'Player Rankings')
        const rankings = Util.createElement('table', '', 'rankings-table', '<tr><th>Player</th><th>Score</th><th>Time</th></tr>');
        const rankedPlayers = Util.rankPlayers(this.players,this.size*this.time)
        rankedPlayers.forEach(player=>{
            const tr = document.createElement('tr')
            const tdname = Util.createElement('td', '', '', player.name)
            const tdscore = Util.createElement('td', '', '', player.score)
            const tdtime = Util.createElement('td', '', '', player.time)
            Util.appendChildren(tr, [tdname, tdscore, tdtime])
            rankings.appendChild(tr)
        })

        const winner = Util.createElement('h2', '','heading-two', `${rankedPlayers[0].name} Won!!!`)
        const winner_div = Util.createElement('div', '', 'winner-div')
        winner_div.appendChild(winner)

        const replay = Util.createElement('button', '', '','Replay Game')
        replay.onclick = () => {this.restart();}

        const newgame = Util.createElement('button', '', '','Create New')
        newgame.onclick = () => {this.clear(); CreateNew()}

        Util.appendChildren(app, [heading, rankings, winner_div,replay, newgame])
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