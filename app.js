var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    contactModel = require('./model/contact.js'),
    path = require('path'),
    usernames = [];
server.listen(process.env.PORT || 3000);


mongoose.connect('mongodb://localhost/contactform',{ useNewUrlParser: true , useUnifiedTopology: true });


var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});
// mongoose.connection
//     .once("open" , () => console.log("Connected..."))
//     .on("error" , error => {
//         console.log("There is some error" , error);
//     });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/model', express.static(__dirname + '/model'));

// app.use(express.static(path.resolve(__dirname, 'public')));

const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  mssSub: String,
  mss: String
});

const contact = mongoose.model("contact" , contactSchema)


  app.post('/contact-form', function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var sub = req.body.mssSub;
    var mss = req.body.mss;


    let message = new contact({
      fname: fname,
      lname: lname,
      email: email,
      mssSub: sub,
      mss: mss
    },
    )

    message.save()
      .then(doc => console.log(doc))
      .catch(err => console.log(err))

    // contact.findOneAndUpdate({fname: fname , lname : lname, email : email, mssSub : sub, mss : mss } , function(err){
    //   if(err){
    //     console.log(err);
    //   }
    //   else{
    //     console.log("Updated")
    //     // res.send('updated')
    //   }
    // })
  })

  // app.get('/post-form' , function(req,res){
  //   res.send('It should be updated')
  // })


app.get('/' , function(req, res){
  res.sendFile(__dirname + '/front.html');
});

app.get('/chart' , function(req,res){
  res.sendFile(__dirname + '/chrt.html');
})

app.get('/contact-form' , function(req , res){
  res.sendFile(__dirname + '/contactform.html')
})

app.get('/chatroom', function(req, res){
  res.sendFile(__dirname + '/index.html');
  //res.sendFile(__dirname + '/style.css');
});



io.sockets.on('connection', function(socket){
  
  socket.on('new user', function(data, callback){
    if(usernames.indexOf(data) != -1){
      callback(false);
    }
    else{
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
    
  });
  
  function updateUsernames(){
    io.sockets.emit('usernames', usernames);
  }
  
  socket.on('send message', function(data){
    io.sockets.emit('new message', {msg: data, user: socket.username});
    
  });
  
  socket.on('disconnect', function(data){
    if(!socket.username) return;
    usernames.splice(usernames.indexOf(socket.username, 1));
    updateUsernames();
  });
});