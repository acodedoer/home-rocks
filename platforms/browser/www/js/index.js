var App = {

    utilobj:{'firstgame': true, 'cameraon': true},
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        SplashScreen()
    },
};

App.initialize();
