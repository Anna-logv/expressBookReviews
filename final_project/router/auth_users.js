const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    return /^[0-9a-zA-Z_-]+$/.test(username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
        return true;
    } else {
        return false;
    }
}
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username) return res.status(404).json({message: "Username is not provided."});
    if (!password) return res.status(404).json({message: "Password is not provided."});
    if (!authenticatedUser(username,password)) return res.status(208).json({message: "Invalid Login. Check username and password"});

    let accessToken = jwt.sign({
        data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn=req.params.isbn;
  const review=req.query.review;
  if (typeof(books[isbn])==='undefined') return res.status(404).json({message: "Book is not found"});
  if (!review || review.toString()==='') return res.status(404).json({message: "Review is not provided."});

  const currUser=req.session.authorization['username'];
  books[isbn].reviews[currUser] = review;

  return res.status(200).send("The review for the book with isbm "+isbn+" has been added");  
  //return res.status(300).json({message: "Yet to be implemented"});
});
// Add a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn=req.params.isbn;

    if (typeof(books[isbn])==='undefined') return res.status(404).json({message: "Book is not found"});
    
    const currUser=req.session.authorization['username'];
    if (!books[isbn].reviews[currUser]) return res.status(404).json({message: "No reviews yet"});
    delete books[isbn].reviews[currUser];

    return res.status(200).send("The review for the book with isbm "+isbn+" posted by user "+currUser+" has been deleted");  
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
