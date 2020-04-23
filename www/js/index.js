var App = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        window.plugins.insomnia.keepAwake()
        SplashScreen()
        //CreateNew()
    },
};

App.initialize();
