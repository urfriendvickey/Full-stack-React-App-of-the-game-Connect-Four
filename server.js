const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Define the connection string to MongoDB atlas database
// Replace <username>, <password>, and <dbname> with your own credentials
const connectionString = 'mongodb+srv://therung74:GwC0tdxa0qhsg1et@cluster0.tv26cws.mongodb.net/?retryWrites=true&w=majority';

// Connect to the database using mongoose
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Endpoint to handle the POST request from the client
app.post('/api/users', (req, res) => {
  const { username, password } = req.body;

  // Create a new user instance
  const user = new User({
    username,
    password
  });

  // Save the user to the database
  user.save()
    .then(() => {
      console.log('User saved successfully');
      res.send('User saved to the database');
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).send(error);
    });
});

// Define a port number for the server to listen on
const port = 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



/* my code
//1
const express = require('express');
const app = express();

//4
const cors = require('cors');
app.use(cors());
app.use(express.json());

//---------------------------------------------------------------------------------------
// 2 3 from bing
// Import express and mongoose modules

const mongoose = require('mongoose');

// Define the connection string to MongoDB atlas database
// Replace <username>, <password>, and <dbname> with your own credentials

const connectionString = 'mongodb+srv://therung74:GwC0tdxa0qhsg1et@cluster0.tv26cws.mongodb.net/?retryWrites=true&w=majority';

// Connect to the database using mongoose

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

// Define a port number for the server to listen on
const port = 3000;


//--------------------------------------------------------------------------------

//3

// another chat gpt 
// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Assuming you have a Mongoose model called "User" defined

const user = new User({ username: 'Jack', password: 'password123' });

user.save()
  .then(() => {
    console.log('User saved successfully');
    // Continue with your logic here
  })
  .catch((error) => {
    console.error('Error saving user:', error);
  });



//---------------------------------------------------------------------------


//1

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the game app backend!' });
  });
  
//----------------------------------------------

//4 following video 2. write the server code to post requests to the Databse from the client side. mp4
app.post('/', (req,res) => {
  const {username, password} = req.body;
  const user = new User({
    username,
    password
  });
  user.save((error) => {
    if (error) {
        res.status(500).send(error);
    } else {
      res.send('User saved to the database');
    }
  });
});

//-----------------------------------------

  //1
app.listen(3000, ()=> {
    console.log('Server listening on port 3000')
})

*/