#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');

if(fs.existsSync('smart.json')) {
  console.log(getMeteoriteNode());
} else {
  console.log(getMeteorNode());
}


function getMeteorToolsPath() {
  try {
    var version = fs.readFileSync('.meteor/release', {encoding: 'utf8'}).trim();
    var releases = require(util.format('%s/.meteor/releases/%s.release.json', process.env.HOME, version));

    var toolsPath = util.format('%s/.meteor/tools/%s', process.env.HOME, releases.tools);
    return toolsPath;
  } catch(ex) {
    console.error("Seems like you are not in a meteor app or you haven't run app, altest once!");
    process.exit(1);
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
  var smartLockFileContent = fs.readFileSync('smart.lock', {encoding: 'utf8'});
  var smartLockFileJSON = JSON.parse(smartLockFileContent);

  if(smartLockFileJSON.meteor.git) {
    var repoNamespace = getGitNamespace(smartLockFileJSON.meteor.git);
    var commitSha = smartLockFileJSON.meteor.commit;
    return path.resolve(homePath, '.meteorite/meteors', repoNamespace, commitSha, 'dev_bundle/bin/node');
  } else {
    return getMeteorNode();
  }

  function getGitNamespace(gitUrl) {
    var parsed = url.parse(gitUrl);
    return parsed.path.replace(/.git$/, '').replace(/^\//, '')
  }
}