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

Run `npm install` to install the dependencies.

#### 2. Create `app.js`

Included in this repository is a reference file named `app.example.js`. Replace the placeholders with your Firebase keys. The structure of the data in Firebase is discussed below.

    // Initialize Firebase
    var config = {
      apiKey: "your-api-key-here",
      authDomain: "your-firebase-domain-here",
      databaseURL: "your-url-here",
      storageBucket: "your-storage-bucket-here",
    };
    firebase.initializeApp(config);

#### 3. Build and Run

This app uses create-react-app, a helpful tool that helps automate the creation of react apps. For more information, check out their [repository on GitHub](https://github.com/facebookincubator/create-react-app).

## Firebase Structure

Both this app and our mobile apps utilize Firebase to deliver our content to all of our users. The best part about Firebase is that it's free if you're just getting started! Check out their docs [here](https://firebase.google.com/docs/) and get familiar with how it works.

Once you've created your project and updated `app.js`, you can refer to our structure as a guide for creating your own schema.

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
