# Setting up ANCOR Dashboard

Follow the quickstart guide to get the dashboard up and running

## Quickstart guide

This instructions are all for OS X

### Setting up ANCOR

Before using this dashboard, you must first install and setup ANCOR. Follow the official guide [here](https://github.com/arguslab/ancor#using-and-configuring-ancor)

### Setting up ANCOR Dashboard for local testing and deployment

Clone the ancor-dashboard repository:

```
git clone https://github.com/arguslab/ancor-dashboard
cd ancor-dashboard
```

#### Node.js for OSX

Install Node.js and NPM with Homebrew for OSX

```
brew install node
```

#### Node.js for Debian based OS

If you are using a debian based host (i.e. ubuntu, mint, etc), you will have to purge the current installation of npm and replace it with the repository used by the creator of npm. Follow the steps below to fix this problem. Reference found [here](https://stackoverflow.com/questions/12913141/installing-from-npm-fails/21715730#21715730)

```
sudo apt-get purge nodejs npm
sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

After this, you should be able to install packages from node in the `Installing dependences` step.

#### Obtaining ruby


Install Ruby with RVM (used for compiling SASS)

```
curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
rvm install ruby
```

#### Installing dependences

Now install the project dependencies with NPM, Bower and Bundler

```
npm install
sudo npm install -g bower grunt-cli # this step might be required on Debian if the npm install did not install bower or grunt-cli.
bower install
bundle install
```

#### Defining the IP Address of ANCOR

Once you have all of the dependencies installed and ANCOR installed and running, you need to define where ANCOR exists. If the Dashboard and ANCOR are on the same network, you should be fine by using the default localhost option that is currently defined and you can skip to _Serving on localhost_.

Otherwise, you need to change that IP called `$rootScope.ancorIPAddress` within `app/scripts/app.js` under the `app.run...` function. The default is `http://localhost:3000`.

    // function within app/scripts/app.js
    //
    app.run(function ($rootScope) {
      // .... //
      $rootScope.ancorIPAddress = 'http://localhost:3000'; // ip_address of ANCOR project
    });

Once this is changed and saved, move onto the next step. If you are wanting to develop the dashboard and add more features, follow the next step with localhost. If you wish to deploy the dashboard, skip down to the deployment section.

#### Serving on localhost

Start the development web server with Grunt

```
grunt serve
```

Then grunt should serve up the application and automatically open the project in your default browser. Grunt will do live reload any time you make changes to the code...so no need to stop the server if you wish to modify the source.

#### Setting up ANCOR Dashboard for Deployment

If you are ready to deploy the dashboard, first you must built the project with grunt.

```
grunt build
```

This will generate all of the files you need to place into a web server like Apache or nginx. The files will be located in the dist folder of the ancor-dashboard project.
