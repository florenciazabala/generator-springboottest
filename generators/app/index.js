"use strict";
const Generator = require("yeoman-generator");
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.configOptions = this.options.configOptions || {};
  }

  initializing() {
    this.log("Generating Spring Boot Application");
  }

  prompting() {
    const prompts = [
      {
        type: "string",
        name: "appName",
        message: "What is the application name?!?!",
        default: "myservice"
      },
      {
        type: "list",
        name: "appType",
        message: "Do you want to use WebMVC or WebFlux?",
        choices: [
          {
            value: "webmvc",
            name: "WebMVC"
          },
          {
            value: "webflux",
            name: "WebFlux"
          }
        ],
        default: "webmvc"
      }
    ];

    return this.prompt(prompts).then(answers => {
      Object.assign(this.configOptions,answers);
    });
  }

  writing() {

    this.fs.copy(
      path.join(__dirname, '../../node_modules/gateway-ip-whitelist/**'),
      this.destinationPath('seed')
    );
    /*const copyFiles = () => {
      return new Promise((resolve, reject) => {
        this.fs.copy(
          path.join(__dirname, '../../node_modules/gateway-ip-whitelist/**'),
          this.destinationPath('seed'),
          console.log("Finish"),
          (err) => {
            if (err) {
                console.log("Error");
              reject(err);
            } else {
                console.log("Resolve");
              resolve();
            }
          }
        );
      });
    };

    const copyTemplate = () => {
      return new Promise((resolve, reject) => {
        this.fs.copyTpl(
          this.templatePath("../../../seed/templates/pom.xml.tpl"),
          this.destinationPath("seed/pom.xml"),
          {
            appName: this.appName,
            appType: this.appType
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    };

    copyFiles()
      .then(() => copyTemplate());*/
  }

  end() {
    this.log(`Application ${this.appName} generated successfully`);
  }
};