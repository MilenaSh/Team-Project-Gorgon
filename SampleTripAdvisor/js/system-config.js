SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'app': './js/app.js',
        'requester': './js/requester.js',
        'templates': './js/templates.js',
        'homeController': './js/controllers/homeController.js',
        'firebaseParser': './js/utils/firebaseParser.js',

        // Libraries
        'jquery' : '../node_modules/jquery/dist/jquery.js'
    }
});