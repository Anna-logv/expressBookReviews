const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username) return res.status(404).json({message: "Username is not provided."});
    if (!password) return res.status(404).json({message: "Password is not provided."});
    if (doesExist(username)) return res.status(404).json({message: "Unable to register user. Username already exists."}); 
    if (!isValid(username))return res.status(404).json({message: "Unable to register user. Invalid username."}); 

    users.push({"username":username,"password":password});
    return res.status(200).json({message: "User successfully registred. Now you can login"});

 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  if (typeof(books[isbn])==='undefined') return res.status(200).json({});
  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author=req.params.author;
  const filtered_books={};
  Object.keys(books).forEach((key) => {
    if (books[key].author===author) filtered_books[key]=books[key];
  });
  return res.status(200).json(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title=req.params.title;
  const filtered_books={};
  Object.keys(books).forEach((key) => {
    if (books[key].title===title) filtered_books[key]=books[key];
  });
  return res.status(200).json(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn;
  if (typeof(books[isbn])==='undefined') return res.status(200).json({});
  return res.status(200).json(books[isbn].reviews);

});

module.exports.general = public_users;
