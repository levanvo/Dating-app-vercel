- Global: npm i -g angular/cli

-----------------------------------
1. ng new <name project> (create a project)

- instruct in package.json:
"scripts": {
    "ng": "ng",
    "start": "ng serve --o",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
},

=== beside: create in src-app-(?)
ng g s <name service...>
ng g c <name folder...>