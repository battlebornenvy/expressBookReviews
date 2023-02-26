const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register new users
const doesExist = (username)=>{
    let usersamename = users.filter((user)=>{
      return user.username === username
    });
    if(usersamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User " +username+ " successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User" +username+ " already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let bookList = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'author' && book[i][1] == req.params.author){
              bookList.push(books[key]);
            }
        }
    }
    if(bookList.length == 0){
        return res.status(300).json({message: "Author not found"});
    }
    res.send(bookList);
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let bookList = []
    for(const [key, values] of Object.entries(books)){
        const book = Object.entries(values);
        for(let i = 0; i < book.length ; i++){
            if(book[i][0] == 'title' && book[i][1] == req.params.title){
              bookList.push(books[key]);
            }
        }
    }
    if(bookList.length == 0){
        return res.status(300).json({message: "Author not found"});
    }
    res.send(bookList);
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

// Using Promise callbacks or Async-Await
// Task 10

function getAllBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 3000);
  
      return;
    });
  }
  
  // Task 11
  
  function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (!book) {
          reject("Book not found");
        }
        resolve(book);
      }, 3000);
    });
  }
  
  // Task 12
  function getBookByAuthor(author) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const booksByAuthor = [];
        for (const key in books) {
          if (books[key].author === author) {
            booksByAuthor.push(books[key]);
          }
        }
        if (booksByAuthor.length === 0) {
          reject("Book not found");
        }
        resolve(booksByAuthor);
      }, 3000);
    });
  }
  
// Task 13
function getBookByTitle(title) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (const key in books) {
          if (books[key].title === title) {
            resolve(books[key]);
          }
        }
        reject("Book not found");
      }, 3000);
    });
  }

module.exports.general = public_users;
