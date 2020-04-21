class Game{
    constructor(mode, size, playernum, time = 30){
        this.mode = mode;
        this.size = size;
        this.playernum = playernum;
        this.players = []
        this.count = 0;
        this.time = 20;
        this.play = {'Random':this.playRandom.bind(this), 'Rounted': this.playRouted.bind(this)}
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
        let para = document.createElement('p');
        para.innerText = "Simple instructions to follow"
        let div = document.createElement('div')
        let next = document.createElement('button')
        next.innerText = 'Next';
        div.appendChild(para)
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
        text.innerText = "Name Player(s)"

        let div_text = document.createElement('div')
        div_text.appendChild(text)
        div_text.className ='heading-div'

        frag.appendChild(div_text)

        for(let i = 0; i < this.playernum; i++){
            let label = document.createElement('h2')
            label.className = 'heading-three'
            label.innerText = `Player ${i+1}`

            let div_label = document.createElement('div')
            div_label.appendChild(label)
            div_label.className ='label-div'

            inputs[i] = document.createElement('input');
            inputs[i].onchange = ({target}) => player[i] = target.value
            frag.appendChild(div_label)
            frag.appendChild(inputs[i])
        }

        form.appendChild(frag)
        let next = document.createElement('button')
        next.innerText = 'Next';
        app.appendChild(form)
        app.appendChild(next)
        next.onclick = () => {
            player.forEach((element, index) => {
                this.players[index] = new Player(element)
            });

            console.log(this.players)
            this.playGame()
        }
    }

    playGame(){
        if ( this.count < this.playernum){
            let app = this.clear()
            let next = document.createElement('button')
            next.innerText = `${this.players[this.count].name} is ready`;
            let myShapes = new Shapes(this.size);
            let set = myShapes.setShapes()
            console.log(this.play)
            next.onclick = () => this.play[this.mode](set, this.players[this.count])
            app.appendChild(next)
        }
    }

    startTimer(size,player){
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
                clearInterval(counter)
                CameraPreview.hide()
                this.gameOver(player.score)
            }
        }

        const counter = setInterval(count, 1000);
        return [timer, counter]
    }

    playRandom(shapes, player){
        let app = this.clear()
        let count = 0;
        let found = []
        player.score = 0;
        let [timer, counter] = this.startTimer(shapes.length, player)
        let status = document.createElement('h1')
        status.className = 'header-two'
        status.id = 'game-status'
        status.innerText = `0 of ${shapes.length}`
        setupCamera();
        app.appendChild(status)
        app.appendChild(timer)

        let shape_div = document.createElement('div')
        let shape_div_random = document.createElement('div')
        shape_div_random.id = 'shape-div-random'
        shape_div.id ='shape-div';

        let shape = document.createElement('h2');
        shape.innerText = `Shapes to scan`;
        shape.className='header-two'
        shape_div.appendChild(shape)

        shapes.forEach((shape,index) => {
            let div = document.createElement('div')
            div.id = 'shape-'+index;
            div.className ='shape'
            div.innerHTML = shape;
            shape_div_random.appendChild(div)
        });
        shape_div.appendChild(shape_div_random)
        app.appendChild(shape_div)

        let camera = document.createElement('div')
        camera.id = 'camera-div'
        camera.classList.add('flex2')
        app.appendChild(camera)

        let scan_div = document.createElement('div')
        scan_div.id ='scan-div';
        let scan = document.createElement('button');
        scan.innerText = "Scan"
        scan.onclick = async () => {
            let result = await window.App.classifyImage()
            if(shapes.indexOf(result[0].label) !== -1 && found.indexOf(result[0].label) === -1){
                found.push(result[0].label)
                let shape_found = document.getElementById(`shape-${shapes.indexOf(result[0].label)}`)
                shape_found.classList.toggle('found-shape');
                player.score += 1;
                if(count < shapes.length - 1){
                    count += 1
                    status.innerText = `${count} of ${shapes.length}`
                }
                else{
                    clearInterval(counter)
                    this.showScore(player)
                    CameraPreview.hide()
                }
            }
        }
        scan_div.appendChild(scan)
        app.appendChild(scan_div)
    }

    playRouted(shapes, player){
        let app = this.clear()
        let count = 0;
        player.score = 0;
        let [timer, counter] = this.startTimer(shapes.length, player)
        let status = document.createElement('h1')
        status.className = 'header-two'
        status.id = 'game-status'
        status.innerText = `1 of ${shapes.length}`
        setupCamera();
        app.appendChild(status)
        app.appendChild(timer)

        let shape_div = document.createElement('div')
        shape_div.id ='shape-div';
        let shape = document.createElement('h2');
        shape.innerText = `Your target is a ${shapes[0]}`;
        shape.className='header-two'
        shape_div.appendChild(shape)
        app.appendChild(shape_div)

        let camera = document.createElement('div')
        camera.id = 'camera-div'
        camera.classList.add('flex2')
        app.appendChild(camera)

        let scan_div = document.createElement('div')
        scan_div.id ='scan-div';
        let scan = document.createElement('button');
        scan.innerText = "Scan"
        scan.onclick = () => {
            player.score += 1;
            
            if(count < shapes.length - 1){
                count += 1
                status.innerText = `${count + 1} of ${shapes.length}`
                shape.innerText = `Your target is a ${shapes[count]}`;
            }
            else{
                clearInterval(counter)
                this.showScore(player)
                CameraPreview.hide()
            }
        }
        scan_div.appendChild(scan)
        app.appendChild(scan_div)
    }

    showScore(){
        let app = this.clear()
        let player = this.players[this.count]
        this.count+=1;

        let para = document.createElement('p')
        para.innerText = `${player.name} scanned ${player.score} shapes`

        let next = document.createElement('button')
        if(this.count < this.playernum){    
            next.innerText = 'Next Player'
            next.onclick = () => {
                this.playGame()
            }
        }
        else{
            next.innerText = 'Standings'
            next.onclick = () => {
                this.showStandings()
            }
        }

        app.appendChild(para)
        app.appendChild(next) 
    }

    gameOver(){
        let app = this.clear()
        let player = this.players[this.count]
        this.count+=1;

        let para = document.createElement('p')
        para.innerText = `${player.name} scanned ${player.score} out of ${this.size} shapes`

        let next = document.createElement('button')
        if(this.count < this.playernum){    
            next.innerText = 'Next Player'
            next.onclick = () => {
                
                this.playGame()
            }
        }
        else{
            next.innerText = 'Standings'
            next.onclick = () => {
                this.showStandings()
            }
        }
        app.appendChild(para)
        app.appendChild(next) 
    }

    showStandings(){
        let app = this.clear()

        let replay = document.createElement('button')
        replay.innerText = 'Replay Game'
        replay.onclick = () => {this.restart();}

        let newgame = document.createElement('button')
        newgame.innerText = 'Create New'
        newgame.onclick = () => {this.clear(); window.App.createGame()}

        app.appendChild(replay)
        app.appendChild(newgame)
    }

    clear(){
        let app = document.querySelector('.app');
        app.innerHTML = ""
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

class Shapes{
    constructor(size){
        this.size = size;
    }

    setShapes(){
        let allShapes = ['flowers', 'berries', 'water', 'a', 's', 'h']
        let set = allShapes.slice(0,this.size)
        return set
    }
}