const express=require('express')
const User=require('../Model/User')
const Book=require('../Model/Book')
const fs = require('fs');
const tabReg = require('../utilitises/regex')

exports.getAllBook= (req, res, next) => {
    Book.find()
      .then(books => {res.status(200).json(books)})
      .catch(error => res.status(400).json({ error }));
  }
  exports.getOneBook= (req, res, next) => {
    Book.findOne({_id:req.params.id})
      .then(book => {res.status(200).json(book)})
      .catch(error => res.status(400).json({ error }));
  }
  exports.getMostRatingBooks= (req, res, next) => {
    Book.find()
      .then(books =>{
        const bestBooks=books.sort((a,b)=>{return a.averageRating-b.averageRating;})
         res.status(200).json(bestBooks.slice(bestBooks.length-3,bestBooks.length))}
         )
      .catch(error => res.status(401).json({ error }));
  }
exports.createBook=(req, res, next) => {
      // console.log(req.body)
    let bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    bookObject.averageRating=bookObject.ratings[0].grade
    // console.log({456:bookObject})
    bookObject= verif(bookObject,res)
    if(bookObject.message){
      res.status(400).json({message : bookObject.message})
    }else{ 
          // if(bookObject.){}
          const book = new Book({
              ...bookObject,
              userId: req.auth.userId,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          });
          if (book.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
          } else {
            book.save()
            .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
            .catch(error => { res.status(400).json( { error })})
          }
        }
  }

exports.modifyBook= (req, res, next) => {
  
  let bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };
if(res.file){
  bookObject= verif(bookObject, res, req.file.size) }else{
  bookObject= verif(bookObject,res)
}
Book.findOne({_id: req.params.id})
    .then((book) => {
      if(bookObject.message){
          res.status(400).json({message : bookObject.message})
        }else{
              if (book.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
              } else {
                  if(req.file){
                      book.imageUrl = book.imageUrl.split('/')[book.imageUrl.split('/').length-1]
                      console.log(book.imageUrl)
                      fs.unlink(`images/${book.imageUrl}`, (err) => {        
                      if (err) throw err;
                });}
            delete bookObject._userId;
            Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));
        }}
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
}

exports.deleteBook= (req, res, next) => {
  // Book.deleteOne({_id: req.params.id})
  // .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
  // .catch(error => res.status(401).json({ error }));

  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
 };

 
 exports.modifyRating= (req, res, next) => {
  // console.log(req.body)
  console.log(req.params.id)
  Book.findOne({_id: req.params.id})
    .then((book) => {
        if (!req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
        } else {
          let moye=0;
          book.ratings.push({"userId":req.auth.userId,"grade":req.body.rating})
          book.ratings.forEach(elt => {
                if(book.ratings.findIndex(e=>e.userId==elt.userId)==0==true){
                  moye=elt.grade
                }else{
                moye=(moye+elt.grade)/book.ratings.length
              }
          });
        book.averageRating=moye
          const bookObject=new Book({...book})
            Book.updateOne({ _id: req.params.id}, { ...book._doc, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Objet modifié!',book:book._doc}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  }
function verif(body, res, fileSize=null){
  if(fileSize>=24000000 || fileSize == 0){
    return({message : "Size of file not authorize"})
  }
  try{       
    console.log({1:body})
    
    return verifObj(body)
}catch(e){
return {message:("Something wrong occured")}
}

}
function verifObj(body){
//  console.log({"body":typeof(body)})
//  console.log({"body":body})
  for(let ez in body){
     let eltTestz= body[ez];
    // console.log({0:ez})
    //  console.log( {153:typeof(body[ez])})
    //  console.log(( {12 : body[ez]}))
    
    if(typeof(body[ez])=="string" && isNaN(body[ez]) && typeof(body[ez])!="object"){
        console.log('not parse')
        eltTestz=body[ez].trim() ?? undefined;
    }
    else if(body[ez] && body[ez]!='' && typeof(body[ez])!="object"){
        console.log('parse')
       eltTestz=parseFloat(body[ez])?? undefined
    }
    else if(typeof(body[ez])=="object"){
            // console.log({256:body[ez]})
         body[ez] =  verifObj(body[ez])
    }
    // console.log({5465:ez})
    // console.log(eltTestz)
    // console.log(typeof(eltTestz))
    // console.log(tabReg[e])
    // console.log(tabReg[e].exec(eltTest))
  if(typeof(eltTestz)!="object"){
        // console.log({5266:"dsd"})
        // console.log({526655:tabReg[ez]})
        if(tabReg[ez].exec(eltTestz)){
            console.log('test')
            body[ez]=eltTestz
        }else{
            return {message:(ez+" : Not Good Format")}
        } 
  }   
}
// console.log(body)
return body
}