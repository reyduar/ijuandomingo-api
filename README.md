# Node.js API RESTful

### Uses

- [Express] ( http://expressjs.com/es/ )
- [Node.js] ( https://nodejs.org/es/ )
- [MongoDB mLab]  ( https://mlab.com/welcome/ )

## Running in Local Machine
```js
npm start
```
## Running in Heroku

[API] (https://deathlyric-api.herokuapp.com/api/)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Deploying App in Heroku with Express Server

- Create a app.json file
```js
{
  "name": "lyric-api",
  "description": "Create By Ariel Duarte (c)2017",
  "repository": "https://github.com/reyduar/node-api/",
  "logo": "http://node-js-sample.herokuapp.com/node.svg",
  "keywords": ["angular2", "express", "node"]
}
```
- Create Procfile file with a command format:

```js
web: node server.js
```

- Create a Express config on a server.js file

```js
// load express module.
var express = require("express");
var bodyParser = require('body-parser')


var app = express();
var port = process.env.PORT || 3000;

// Always use express inbuilt router.
var router = express.Router();
router.get('/',function(req,res){
 // Express determines the common header type.
 res.end("<h1>Express is running</h1>");
});
// This will navigate all router to proceed /home
app.use('/home',router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, function(){
	console.log(`Listening at Server http://localhost:${port}`);
});
```

- Add on script part on package.json file

```js
"scripts": {
  "start": "node server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```


## Author

- [Ariel Duarte]( https://github.com/reyduar )
- [Ivan Duarte]( https://github.com/ivanpy )
