#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var url = require('url');

var METEOR_APP_PATH = process.env.METEOR_APP_PATH || '.';

if(fs.existsSync('smart.json')) {
  console.log(getMeteoriteNode());
} else {
  console.log(getMeteorNode());
}

function getMeteorToolsPath() {
  try {
    var version = fs.readFileSync(METEOR_APP_PATH + '/.meteor/release').toString().trim();
    var releases = require(util.format('%s/.meteor/releases/%s.release.json', process.env.HOME, version));

    var toolsPath = util.format('%s/.meteor/tools/%s', process.env.HOME, releases.tools);
    return toolsPath;
  } catch(ex) {
    console.error("\nSeems like you are not in a meteor app or you haven't run app, altest once!");
    throw ex;
  }
}

function getMeteorNode() {
  if(process.env.METEOR_PATH) {
    return path.resolve(process.env.METEOR_PATH, 'dev_bundle/bin/node');
  } else {
    var toolsPath = getMeteorToolsPath();
    return path.resolve(toolsPath, 'bin/node');
  }
};

function getMeteoriteNode(appPath) {
  var smartLockFileContent = fs.readFileSync(METEOR_APP_PATH + '/smart.lock').toString();
  var smartLockFileJSON = JSON.parse(smartLockFileContent);

  if(smartLockFileJSON.meteor.git) {
    var repoNamespace = getGitNamespace(smartLockFileJSON.meteor.git);
    var commitSha = smartLockFileJSON.meteor.commit;
    return path.resolve(process.env.HOME, '.meteorite/meteors', repoNamespace, commitSha, 'dev_bundle/bin/node');
  } else {
    return getMeteorNode();
  }

  function getGitNamespace(gitUrl) {
    var parsed = url.parse(gitUrl);
    return parsed.path.replace(/.git$/, '').replace(/^\//, '')
  }
}