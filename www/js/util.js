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
        const app = document.querySelector('.app')
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

    static finalFeedback(){
        const div = Util.createElement('div', '', 'div-container')
        const info1 = Util.createElement('p', '', '', "Tell us how you played your game by including the hashtag #chicirocks on Twitter, Instagram or Facebook.");
        const sm = document.createElement('div');
        sm.innerHTML = "<a target='_blank' href='http://www.twitter.com'><img class='sm' src='img/t.svg'></a> <a target='_blank' href='http://www.instagram.com'><img class='sm' src='img/i.svg'></a> <a target='_blank' href='http://www.facebook.com'><img  class='sm' src='img/f.svg'></a>"
        const info2 = Util.createElement('p', '', '', "For more game ideas see <a target='_blank' style='color:black' href='http://www.chici.org/rocks'>the ChiCi website</a>");
        Util.appendChildren(div, [info1,sm,info2])
        return div;
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
        next.style.textAlign = "right"
        return next
    }

    static createFooter(back='',next='',text=''){
        const buttonClick = document.querySelector('#button-click')
        const footer = document.createElement('footer')
        if(text!=''){
            const msg = Util.createElement('h2', '', 'heading-two-no-space', text)
            if(text!="Snap"){
                footer.addEventListener('click', () => buttonClick.play());
            }
            footer.appendChild(msg)
            footer.className='actionFooter'
        }
        else if(back==''){
            next.addEventListener('click', ()=>buttonClick.play());
            footer.appendChild(next)
            footer.className='singleFooter'
        }
        else{
            next.addEventListener('click', () => buttonClick.play());
            back.addEventListener('click', () => buttonClick.play());
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
        back.style.textAlign = "left"
        return back
    }
    
}