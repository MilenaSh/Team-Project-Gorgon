SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'app': './js/app.js',
        'genericRequester': './js/requesters/genericRequester.js',
        'userRequester': '/js/requesters/userRequester.js',
        'objectsRequester': './js/requesters/objectsRequester.js',
        'objectPagesController': './js/controllers/objectPagesController.js',
        'userController':'./js/controllers/userController.js',
        'hotelDetailsController' : '/js/controllers/hotelDetailsController.js',
        'templates': './js/templates.js',
        'helperRegister': './js/helperRegister.js',

        // Libraries
        'jquery' : 'libs/jquery/dist/jquery.js',
        'bootstrap': 'libs/bootstrap/dist/js/bootstrap.js',
        'handlebars': 'libs/handlebars/dist/handlebars.js',
        'navigo': 'libs/navigo/lib/navigo.js'
    }
});