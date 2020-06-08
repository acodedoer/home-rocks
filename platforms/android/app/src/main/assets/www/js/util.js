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
            msg.style.height='100%'
            msg.style.margin= '0 auto'
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
                const buttons = document.querySelectorAll('.smiley-button')
                buttons.forEach(btn=>{
                    btn.onclick = ()=> {console.log('clicked');func != ""?func():app.removeChild(modal)}
                    
                })
            }
            
        
    }

    static createHeadingShapes = (side) => {
        const right = document.createElement('div')
        const img3 = Util.createElement('img', '', 'small-shape')
        const img4 = Util.createElement('img', '', 'small-shape')
        img3.src = 'img/new/circle-blue.svg'
        img4.src = 'img/new/triangle.svg'
    
        const left = document.createElement('div')
        const img1 = Util.createElement('img', '', 'small-shape')
        const img2 = Util.createElement('img', '', 'small-shape')
        img1.src = 'img/new/star-on.svg'
        img2.src = 'img/new/cross.svg'
    
        Util.appendChildren(right, [img1, img2])
        Util.appendChildren(left, [img3, img4])
        return [right, left]
    }

    static createHeader(text=''){
        const header = Util.createElement('div', 'regular-header','flex-row')
        const [right_shapes, left_shapes] = Util.createHeadingShapes()
        text==''?text='Home Rocks':text
        const heading = Util.createElement('h1', '', 'heading-two', text)
        Util.appendChildren(header, [left_shapes, heading, right_shapes])
        return header
    }

    static createNext(){
        const next = document.createElement('div')
        const nextImage = Util.createElement('img', '','small-shape')
        nextImage.src='img/new/next-on.svg'
        const nextP = Util.createElement('h2', '', 'heading-three-no-space', 'Next')
        Util.appendChildren(next, [nextImage,nextP])
        return next
    }

    static createFooter(back='',next='',text=''){
        const footer = document.createElement('footer')
        //##5ce65c
        if(text!=''){
            const msg = Util.createElement('h2', '', 'heading-two-no-space', text)
            footer.appendChild(msg)
            footer.className='actionFooter'
        }
        else if(back==''){
            footer.appendChild(next)
            footer.className='singleFooter'
        }
        else{
            Util.appendChildren(footer, [back,next])
            footer.className='doubleFooter'
        }
        return footer
    }

    static createBack(){
        const back = document.createElement('div')
        const backImage = Util.createElement('img', '','small-shape')
        backImage.src='img/new/back-on.svg'
        const backP = Util.createElement('h2', '', 'heading-three-no-space', 'Back')
        Util.appendChildren(back, [backImage,backP])
        return back
    }
    
}