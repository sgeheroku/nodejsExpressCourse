const path = require('path');
const dotenv = require('dotenv').config({ path: './config/.env' });
const express = require('express');
const exphbs = require('express-handlebars');
const middlewareLogger = require('./middleware/logger');
const pets = require('./pets');

const app = express();

// app.get('/',(req,res)=>{
//     //res.send('<h1>Hello My World!</h1>');
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });

//init middleware
//app.use(middlewareLogger);

// Handlebars Middleware
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Homepage Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Pet App',
    pets
  })
);

//api routing
app.use('/api/pets', require('./routes/api/pets'));

//set static folder
app.use(express.static(path.join(__dirname,'public')));


console.log('process.env: '+ JSON.stringify(process.env));
console.log('process.env.PORT: '+ process.env.PORT);
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`)});

