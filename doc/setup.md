# Setting up ANCOR Dashboard

Follow the quickstart guide to get the dashboard up and running

## Quickstart guide

This instructions are all for OS X

### Setting up ANCOR

Before using this dashboard, you must first install and setup ANCOR. Follow the official guide [here](https://github.com/arguslab/ancor#using-and-configuring-ancor)

### Setting up ANCOR Dashboard for local testing

Install Node.js and NPM with Homebrew

```
brew install node
```

Install Ruby with RVM (used for compiling SASS)

```
curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm install ruby
```

Now install the project dependencies with NPM, Bower and Bundler

```
npm install
bower install
bundle install
```

#### Defining the IP Address of ANCOR

Once you have all of the dependencies installed and ANCOR installed and running, you need to define where ANCOR exists. If the Dashboard and ANCOR are on the same network, you should be fine by using the default localhost option that is currently defined. Otherwise, you need to change that IP called `$rootScope.ancorIPAddress` within `app/scripts/app.js` under the `app.run...` function. The default is `http://localhost:3000`.

    app.run(function ($rootScope) {
      // .... //
      $rootScope.ancorIPAddress = 'http://localhost:3000'; // ip_address of ANCOR project
    });

Once this is changed and saved, move onto the next step.

#### Serving on localhost

Start the development web server with Grunt

```
grunt serve
```

Then grunt should serve up the application and automatically open the project in your default browser.

### Setting up ANCOR Dashboard for Deployment
