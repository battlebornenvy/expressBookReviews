const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register new users
public_users.post("/register",function (req,res) {
    if (req.body.userName){
        public_users[req.body.userName] = {
            "password":req.body.password            
            }
    }
res.send("The user" + (' ')+ (req.body.userName) + " Has been added!");
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
    const title = req.params.title;
    res.send(books[title]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

module.exports.general = public_users;
