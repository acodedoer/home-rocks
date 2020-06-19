var App = {
    audio : null,
    utilobj:{'review':false, 'reviewcount': 0, 'firstgame': true, 'cameraon': true, 'names':[], 'players': null, 'size': null, 'mode': null},
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        SplashScreen()
    },
};
App.initialize();
