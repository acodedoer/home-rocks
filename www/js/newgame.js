const CreateNew = () => {
    let [buttonSetupGame, GameSettings] = SetupGame()
    buttonSetupGame.onclick = (e) =>{
        e.preventDefault()
        let game = new Game(GameSettings.selectmode, GameSettings.selectsize, GameSettings.selectplayers)
        game.startGame()
    }
}

const SplashScreen = () => {
    LoadModel(()=> console.log('Model loaded'))
    const app = Util.clear()
    const title = Util.createElement('h1', '', 'heading-one', 'Home Rocks')
    app.appendChild(title)
    TestModel().then((result)=>{console.log(result)}).then(()=>CreateNew()).catch((err)=>{console.log(err);CreateNew()})
}

const SetupGame = () => {
    const app = Util.clear()
    const settings = {'selectmode':'Random', 'selectsize':6, 'selectplayers':2}
    const form = document.createElement('form');
    const heading = Util.createElement('h1', '', 'heading-two', 'Choose Game Settings')
    const div_text = Util.createElement('div', '', 'heading-div')
    div_text.appendChild(heading)
    const div_form =  Util.createElement('div', '', 'form-div')
    const selectMode = SelectOptions('selectmode', 'Select mode', ['Random', 'Routed'], settings)
    const selectSize = SelectOptions('selectsize', 'Select number of shapes', [6,5,4,3], settings)
    const selectPlayers = SelectOptions('selectplayers', 'Select number of players', [2,3,4], settings)
    const buttonCreate = Util.createElement('button','', "","Create Game")
    const frag = document.createDocumentFragment();
    Util.appendChildren(frag, [div_text, selectMode, selectSize, selectPlayers, buttonCreate])   
    form.appendChild(frag)
    div_form.appendChild(form)
    Util.appendChildren(app, [div_text, div_form])
    return [buttonCreate, settings]
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