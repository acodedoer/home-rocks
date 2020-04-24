var App = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        SplashScreen()
        //CreateNew()
    },
};

App.initialize();
