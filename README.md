# SDIVisualTools

## What is SDI VisualTools?
SDI VisualTools is an Angular 5 app that acts as teaching assistant designed to help teachers visualise student progress in Computer Science (CS). PowerBI is used to present the visualisations.

The solution is based on the Scaffolding-Discovery-Innovation (SDI) methodology, a constructionist learning theory which is currently being implemented at the University College London (UCL). 

## Technologies used:
 * [Angular 5](https://angular.io/)
 * [Node.js](http://nodejs.org/)
 * [PowerBI](https://powerbi.microsoft.com/en-us/)
 * [Firebase](https://firebase.google.com/)
 * [Bootstrap 4](https://v4-alpha.getbootstrap.com/)
 * Tests written in  [Jasmine](http://jasmine.github.io/) 
 * Test executed with [Karma Test Runner](http://karma-runner.github.io/0.8/index.html)
 
 ### Other libraries:
  * [Angular2-Markdown](https://www.npmjs.com/package/angular2-markdown)
  * [AngularFire5](https://github.com/angular/angularfire2)
  * [XLSX](https://www.npmjs.com/package/xlsx)
  * [FontAwesome](http://fontawesome.io/)
  * [AngularMaterial5](https://material.angular.io/)
 
## Installation Guide:
### Preparing the development environment:

* Install node.js.
* Use the node package manager to install the Angular CLI on your machine (-g stands for global installation) and check that the installation was successful.

```
npm install - g @angular/cli
ng --version
```
### Getting the code

* Clone this report or fork it and clone the new fork. Navigate to the SDIVisualTools folder.

```
git clone https://github.com/kiily/SDIVisualTools.git
cd SDIVisualTools
```

###  Installing the dependencies (ensure you are in the project root folder)

```
npm install
```

## Running the application on localhost

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Building the application

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
