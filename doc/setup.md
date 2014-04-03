# Setting up ANCOR Dashboard

Follow the quickstart guide to get the dashboard up and running

## Quickstart guide

This instructions are all for OS X

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

Start the development web server with Grunt

```
grunt serve
```
