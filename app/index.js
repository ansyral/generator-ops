"use strict"

var Generator = require('yeoman-generator');

var SupportedLanguages = {
  "dotnet": "dotnet",
  "java": "java",
  "rest": "rest"
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.data = {};
    this.options = {
      globOptions: {
        dot: true
      }
    }
    this.writingForCommon = function () {
      var commonTemplateDir = this.templatePath('common');
      this.fs.copy(
        commonTemplateDir,
        this.destinationPath(),
        this.options
      );
    }

    this.writingForDotnet = function () {
      var dotnetTemplateDir = this.templatePath('dotnet');
      this.fs.copy(
        dotnetTemplateDir,
        this.destinationPath(),
        this.options
      );
    }

    this.writingForJava = function () {
      var javaTemplateDir = this.templatePath('java');
      this.fs.copy(
        javaTemplateDir,
        this.destinationPath(),
        this.options
      );
    }

    this.writingForRest = function () {
      var restTemplateDir = this.templatePath('rest');
      this.fs.copy(
        restTemplateDir,
        this.destinationPath(),
        this.options
      );
    }
  }

  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'language',
      message: 'Which language are you onboarding for(dotnet/java/rest)',
      choices: [
        'dotnet',
        'java',
        'rest'
      ]
    }]).then((answers) => {
      this.data.language = answers.language;
    });
  }

  writing() {
    this.writingForCommon();
    switch (this.data.language) {
      case SupportedLanguages.dotnet:
        this.writingForDotnet();
        break;
      case SupportedLanguages.java:
        this.writingForJava();
        break;
      case SupportedLanguages.rest:
        this.writingForRest();
        break;
    }
  }
};