class Util{
    static setShapes(size){
        let allShapes = this.shuffleArray(['circle', 'crescent', 'triangle', 'diamond', 'star', 'cross'])
        let subset = allShapes.slice(0, size)
        let set = []
        subset.forEach((shape, index) => {
            let svg = document.createElement('img')
            svg.src = `img/${shape}.svg`
            svg.className = 'image-SVG'
            set.push({shape: shape, svg: svg})
        });
        return set
    }

    static shuffleArray(array){
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    static createElement(tag, id="", classname="", html=""){
        let el = document.createElement(tag)
        el.id = id
        el.className = classname
        el.innerHTML = html
        return el
    }

    static appendChildren(parent, children){
        children.forEach(child => parent.appendChild(child))
        return parent
    }

    static clear(){
        let app = document.querySelector('.app')
        app.innerHTML = ""
        return app
    }
    
    static separatePlayers(players, maxtime){
	    let a = []
        let b = []
  
        players.forEach(player=>{
            if(player.time == maxtime){
                b.push(player)
            }
            else{
            a.push(player)
            }
        })
        return[a,b]
    }

    static rankScore( a, b ) {
        if ( a.score > b.score ){
            return -1;
        }
        if ( a.score < b.score ){
            return 1;
        }
        return 0;
    }

    static rankTime( a, b ) {
        if ( a.time < b.time ){
            return -1;
        }
        if ( a.time > b.time ){
            return 1;
        }
        return 0;
    }

    static rankPlayers(players, maxtime){
        let[a,b] = this.separatePlayers(players)
        a.sort(this.rankTime, maxtime)
        b.sort(this.rankScore)
        let c = []
        c.push(...a)
        c.push(...b)
        return c
    }

    static showMessage(msg, func="", element = false){
        const app = document.querySelector('.app');
        const modal = this.createElement('div','', 'modal')
        const content = this.createElement('div', '', 'modal-content')
        const close = this.createElement('span', '', 'close', '&times')
        let message;

        if(element == false){
         message = this.createElement('p', '', 'modal-message', msg)
        }
        else{
            message = msg;
        }
        
        this.appendChildren(content, [close,message])
        modal.appendChild(content)
        app.appendChild(modal)
        

        close.onclick = ()=> {
            if (func != "")
            func()
            else app.removeChild(modal)
        }

        if(element == true){
            window.onclick = function(event) {
                const img = document.querySelector('.shape-small')
                if (event.target.className == 'image-SVG') {
                    console.log(2)
                    img.style.border = "2px solid gray"
                    func()
                }
            }
        }
    }
}