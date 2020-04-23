const CreateNew = () => {
    let app = document.querySelector('.app')
    app.innerHTML = ""
    let [buttonSetupGame, GameSettings] = SetupGame()
    buttonSetupGame.onclick = (e) =>{
        e.preventDefault()
        let game = new Game(GameSettings.selectmode, GameSettings.selectsize, GameSettings.selectplayers)
        game.startGame()
    }
}

const SplashScreen = () => {
    LoadModel(()=> console.log('Loaded'))
    let app = document.querySelector('.app')
    app.innerHTML = ""
    let title = document.createElement('h1')
    title.innerText = 'Home Rocks'
    title.className = 'heading-one'
    app.appendChild(title)
    TestModel().then((result)=>{console.log(result)}).then(()=>CreateNew()).catch((err)=>{console.log(err);CreateNew()})
}


const SetupGame = () => {
    let settings = {'selectmode':'Random', 'selectsize':6, 'selectplayers':1}
    let form = document.createElement('form');
    let frag = document.createDocumentFragment();

    let text = document.createElement('h1')
    text.className = 'heading-two'
    text.innerText = "Choose Game Settings"

    let div_text = document.createElement('div')
    div_text.appendChild(text)
    div_text.className ='heading-div'

    frag.appendChild(div_text)
    
    let div_form =  document.createElement('div')
    div_form.className ='form-div'

    let selectMode = SelectOptions('selectmode', 'Select mode', ['Random', 'Routed'], settings)
    frag.appendChild(selectMode)
    let selectSize = SelectOptions('selectsize', 'Select number of shapes', [6,5,4,3], settings)
    frag.appendChild(selectSize)

    let selectPlayers = SelectOptions('selectplayers', 'Select number of players', [1,2,3], settings)
    frag.appendChild(selectPlayers)

    let buttonCreate = document.createElement('button')
    buttonCreate.innerHTML="Create Game"
    frag.appendChild(buttonCreate)
    form.appendChild(frag)

    div_form.appendChild(form)

    document.querySelector('.app').appendChild(div_text)
    document.querySelector('.app').appendChild(div_form)

    return [buttonCreate, settings]
}

const SelectOptions = (name, label, values, settings) => {
    let frag = document.createDocumentFragment()

    let div = document.createElement('div')
    div.className = "select-div"

    let label_tag = document.createElement('label')
    label_tag.setAttribute('for', name)
    label_tag.innerHTML = `<h3 class = "form-label">${label}</h3>`
    

    let select = document.createElement('select')
    select.id = name;
    values.forEach(value => {
        let opt = document.createElement('option')
        opt.setAttribute('value', value)
        opt.innerHTML=value;
        frag.appendChild(opt)
    });
    select.onchange = ({target}) => settings[name]=target.value;
    select.appendChild(frag)

    div.appendChild(label_tag)
    div.appendChild(select)
    return div
}