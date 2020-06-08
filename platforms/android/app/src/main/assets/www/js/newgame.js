const CreateNew = () => {
    let [buttonSetupGame, GameSettings] = SetupGame()
    buttonSetupGame.onclick = (e) =>{
        e.preventDefault()
        let game = new Game(GameSettings.selectmode, GameSettings.selectsize, GameSettings.selectplayers)
        game.startGame()
    }
}

const SplashScreen = () => {
    const MODEL = "https://teachablemachine.withgoogle.com/models/fYluH55oQ/" + "model.json";
    ml5.imageClassifier(MODEL).then(result => 
    {
        classifier = result
        const app = Util.clear()
        const title = Util.createElement('h1', '', 'heading-one', 'Home Rocks')
        app.appendChild(title)
        TestModel().then((result)=>{console.log(result)}).then(()=>CreateNew()).catch((err)=>{console.log(err);CreateNew()})
    })
    .catch(err => {
        Util.showMessage('Make sure you have a working internet connection', SplashScreen, false)
    })
    
}

const SetupGame = () => {
    const app = Util.clear()
    const settings = {'selectmode':'Random', 'selectsize':3, 'selectplayers':2}
    const header = Util.createHeader()
    const div_form =  Util.createElement('div', '', 'div-container-left')
    const selectMode = createSeletcMode(settings)
    const selectSize = createSelectSize(settings)
    const selectPlayers = createSelectPlayers(settings)
    const buttonCreate = Util.createNext()
    const footer = Util.createFooter('',buttonCreate);
    Util.appendChildren(div_form, [selectMode, selectSize, selectPlayers])   
    Util.appendChildren(app, [header, div_form, footer])
    if(App.utilobj.firstgame==false){
        document.querySelector(`#star${App.utilobj.size}`).click()
        document.querySelector(`#ball${App.utilobj.players}`).click()
        document.querySelector(`#img-${App.utilobj.mode.toLowerCase()}`).click()


    }
    return [buttonCreate, settings]
}

const createSelectSize = (settings) => {
    const MAX = 6
    const MIN = 3
    const div = Util.createElement('div', '', 'div-container-left')
    const heading = Util.createElement('h2', '', 'heading-three', 'Number of shapes')
    const size_div = Util.createElement('div', '', 'flex-row-left')
    const nodes = []
    const setSize = (min, value)=>{
        value<min?settings.selectsize=min:settings.selectsize=value
        for(let i = 1; i<=settings.selectsize; i++){
            setTimeout(()=>{nodes[i].src='img/new/star-on.svg'},i*10)
        }
        for(let i = settings.selectsize +1; i<=MAX; i++){
            setTimeout(()=>{nodes[i].src='img/new/star-off.svg'},i*10)
        }
    }
    for(let i = 1; i<=MAX; i++){
        nodes[i] = Util.createElement('img', `star${i}`, 'small-shape-spaced');
        i<=3? nodes[i].src='img/new/star-on.svg':nodes[i].src='img/new/star-off.svg'
        nodes[i].onclick = ()=>setSize(MIN, i)
    }
    Util.appendChildren(size_div,nodes)
    Util.appendChildren(div, [heading,size_div])
    return div
}

const createSelectPlayers = (settings) => {
    const MAX = 4
    const MIN = 2
    const div = Util.createElement('div', '', 'div-container-left')
    const heading = Util.createElement('h2', '', 'heading-three', 'Number of players')
    const size_div = Util.createElement('div', '', 'flex-row-left')
    const setSize = (min, value)=>{
        value<min?settings.selectplayers=min:settings.selectplayers=value
        for(let i = 1; i<=settings.selectplayers; i++){
            setTimeout(()=>{nodes[i].src='img/new/circle-on.svg'},i*10)
        }
        for(let i = settings.selectplayers +1; i<=MAX; i++){
            setTimeout(()=>{nodes[i].src='img/new/circle-off.svg'},i*10)
        }
    }
    const nodes = []
    for(let i = 1; i<=MAX; i++){
        nodes[i] = Util.createElement('img', `ball${i}`, 'small-shape-spaced');
        i<=2?nodes[i].src='img/new/circle-on.svg':nodes[i].src='img/new/circle-off.svg'
        nodes[i].onclick = ()=>setSize(MIN, i)
    }
    Util.appendChildren(size_div,nodes)
    Util.appendChildren(div, [heading,size_div])
    return div
}

const createSeletcMode = (settings) => {
    const div = Util.createElement('div', '', 'div-container-left')
    const heading = Util.createElement('h2', '', 'heading-three', 'Mode')
    const modes_div = Util.createElement('div', '', 'flex-row-between')

    const routed_btn = Util.createElement('div', 'btn-routed')
    const routed_img = Util.createElement('img', 'img-routed', 'small-shape-extra-spaced')
    routed_img.src = 'img/new/routed-off.svg'
    const routed_p = Util.createElement('p', '', 'align-center', 'Routed')

    const random_btn = Util.createElement('div', 'btn-random')
    const random_img = Util.createElement('img', 'img-random', 'small-shape-extra-spaced')
    random_img.src = 'img/new/random-on.svg'
    const random_p = Util.createElement('p', '', 'align-center', 'Random')

    Util.appendChildren(routed_btn, [routed_img, routed_p])
    Util.appendChildren(random_btn, [random_img, random_p])
    Util.appendChildren(modes_div, [random_btn, routed_btn])

    Util.appendChildren(div, [heading,modes_div])

    const setMode = (e) =>{
        if(e.target==random_img){
            routed_img.src = 'img/new/routed-off.svg'
            random_img.src = 'img/new/random-on.svg'
            settings.selectmode = 'random'
        }
        else if(e.target==routed_img){
            routed_img.src = 'img/new/routed-on.svg'
            random_img.src = 'img/new/random-off.svg'
            settings.selectmode = 'Routed'
        }
    }
    random_btn.onclick = setMode
    routed_btn.onclick = setMode
    return div
}

const SelectOptions = (name, label, values, settings) => {
    const frag = document.createDocumentFragment()
    const div = Util.createElement('div','',  'select-div')
    const label_tag = Util.createElement('label', '', '', `<h3 class = "form-label">${label}</h3>`)
    label_tag.setAttribute('for', name)    
    const select = Util.createElement('select', name, '', '')
    values.forEach(value => {
        const opt = Util.createElement('option','', '', value) 
        opt.setAttribute('value', value)
        frag.appendChild(opt)
    });
    select.onchange = ({target}) => settings[name]=target.value;
    select.appendChild(frag)
    Util.appendChildren(div, [label_tag, select])
    return div
}