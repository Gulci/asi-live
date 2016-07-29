ASI Live
========

ASI Live is a small one-page web app that we use to post content via Firebase on our app. This includes merchandise, Whats Up posts, and hopefully more in the future.

## Getting Started

First, install the needed dependencies.

#### 1. Dependencies

##### Bower

Run `bower install` to install the bower dependencies.

- [Bootstrap](http://getbootstrap.com/)
- [font-awesome](http://fontawesome.io/)

##### Node modules

Run `npm install` to install these dependencies. These include important dev dependencies such as webpack!

Important ones:

- [webpack](https://webpack.github.io/)
- [React](https://facebook.github.io/react/)

#### 2. Create `app.jsx`

Included in this repository is a reference file named `app.jsx.example`. Replace the placeholders with your Firebase keys. The structure of the data in Firebase is discussed below.

    // Initialize Firebase
    var config = {
      apiKey: "your-api-key-here",
      authDomain: "your-firebase-domain-here",
      databaseURL: "your-url-here",
      storageBucket: "your-storage-bucket-here",
    };
    firebase.initializeApp(config);

#### 3. Build and Run

This app uses webpack to put all of the separate ES2015 javascript files and `.jsx` components into one `.js` file that is served to the browser.

##### Explanation of `webpack.config.js`

This file is used to configure webpack to build our app for development and production.

The initial entry-point of the app is located here.

    entry: './src/app.jsx'

The js bundle is output to a directory named `/js` in the root directory.

    output: {
        filename: 'bundle.js',
        publicPath: '/js'
    }

We are using a few modules:

 - babel-loader
    - this allows us to use ES2015 and JSX and compile it to work on the browser
 - style-loader & css-loader
    - allows us put our stylesheets into our `/src` directory and include it in components
    - also allows for the inclusion of `node_modules` stylesheets

We are using the DefinePlugin to allow us to specify to React if we are in [development or production mode](https://facebook.github.io/react/downloads.html) (see Development vs. Production Builds).

When developing, simply run `npm run start` in the root directory and make sure NODE_ENV is set to development. This assumes that the `index.html` file you are using has the following script tags present:
    
    <script src="http://localhost:8090/webpack-dev-server.js"></script>
    <script type="text/javascript" src="http://localhost:8090/js/bundle.js"></script>

This allows you to make changes to your javascript files and see these changes apply automatically in the browser. No more manual refreshing!! Just make sure you're at [localhost:8090](localhost:8090).

When outputting for production, use the following command to minify: `webpack --optimize-minimize --optimize-occurrence-order` and be sure to change the NODE_ENV line to "production".

You'll also want to make sure that you don't use the script tags above. Instead, use:

    <script type="text/javascript" src="./js/bundle.js"></script>

Simply refer to `index.html` and `index-prod.html` to see the difference.

## Firebase Structure

Both this app and our mobile apps utilize Firebase to deliver our content to all of our users. The best part about Firebase is that it's free if you're just getting started! Check out their docs [here](https://firebase.google.com/docs/) and get familiar with how it works.

Once you've created your project and updated `app.jsx`, you can refer to our structure as a guide for creating your own schema.

    {
        "merch": {
            "key":{"imageURL":"your-image-url.here"},
        },
        "posts": {
            "key":{"imageURL":"your-image-url.here"},
        }
    }

This app comes with a `PostManager` component that allows for the specification of a child. For example, if I want it to post to merch, it would be invoked as follows:

    <PostManager child="merch" />

Some other components also need this prop passed down.

## Helpful Posts

- [Routing with React](http://jamesknelson.com/routing-with-raw-react/)
- [React with Webpack](http://jslog.com/2014/10/02/react-with-webpack-part-1/)
