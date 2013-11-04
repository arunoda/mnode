# mnode

### How to find the node version used by Meteor

This simple tool, helps you to find the NodeJS binary used by meteor. This tool compatible with following types of apps

* Uses direct meteor installation
* With Meteorite
* Uses meteor from a git checkout

## Installation

    sudo npm install -g mnode

## Usage

### Find the path to the node binary

* First visit to the app directory
* Please run your app at-least once before proceed to the next step
* Then simply invoke `mnode` to find the path

### Using nodejs binary

* It is possible to use the node binary directly we well
* Use this command - `$(mnode) -v`

### With Custom Git Checkout

* You need to tell `mnode`, about the PATH where meteor installed (git repo)

### Getting NODE_PATH

Now it is possible to get the NODE_PATH used by meteor's node

* `mnode --node-path` will do the trick 

See How to do it

    export METEOR_PATH=/path/to/the/git-repo
    mnode

