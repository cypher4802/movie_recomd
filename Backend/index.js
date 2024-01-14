const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const routes= require('../routes');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app=express();


//Connect to MOngoDb atlas
mongoose.connect('mongodb+srv://tanmay258789:TkfIatpc1yhxauRL@cluster0.dey9osy.mongodb.net/cinneslight',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Enable credentials (cookies, HTTP authentication)
    optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  

// routes
// app.use('/api',routes);
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/movies',movieRoutes);
 

// start the server
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`server is running on port ${port}`);    
});
