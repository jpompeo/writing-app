const Authentication = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');
const User = require('./models/user');
const Book = require('./models/book');
const Chapter = require('./models/chapter');
const Goal = require('./models/goal');
const Update = require('./models/update');
const mongoose = require ('mongoose');
mongoose.set('useFindAndModify', false);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  //login and authentication
  app.post('/auth/signup', Authentication.signup);
  app.post('/auth/signin', requireSignin, Authentication.signin);

  //get current user
  app.get('/auth/current_user', requireAuth, Authentication.currentUser);

  //add book
  app.post('/users/:userId/book', requireAuth, (request, response) => {
    //get book info from request
    const title = request.body.title;
    const description = request.body.description;
    const userId = request.params.userId;

    //create new book
    const newBook = new Book({
      title: title,
      description: description,
      userId: userId
    });

  //save book and send back response
    newBook.save((error, bookCreated) => {
      if (error) response.end(error)
      //find user and add new book ID to books array
      User
        .findOneAndUpdate({ _id: userId }, { $push: { books: [bookCreated._id] } }, { runValidators: true })
        .exec((error, updatedUser) => {
          if (error) response.end(error)
          response.send(bookCreated)
        })
    })
  });

  //add goal
  app.post('users/:userId/goals', (request, response) => {
    //get goal info from request
    const goalStartDate = request.body.goalStartDate;
    const goalEndDate = request.body.description;
    const goalItem = request.body.goalItem;
    const goalType = request.body.goalType;
    const notes = request.body.notes;
    const userId = request.params.userId;

    //create new goal
    const newGoal = new Goal({
      goalStartDate: goalStartDate,
      goalEndDate: goalEndDate,
      goalItem: goalItem,
      goalType: goalType,
      notes: notes,
      userId: userId
    });

  //save book and send back response
    newGoal.save((error, goalCreated) => {
      if (error) response.end(error)
      //find user and add new book ID to books array
      User
        .findOneAndUpdate({ _id: userId }, { $push: { goals: [goalCreated._id] } }, { runValidators: true })
        .exec((error, updatedUser) => {
          if (error) response.end(error)
          response.send(goalCreated)
        })
    })
  });

    //add update
    // app.post('users/:userId/update', (request, response) => {
    //   //get update info from request
    //   const bookId = request.body.bookId;
    //   const dailyWordCount = request.body.dailyWordCount;
    //   const notes = request.body.notes;
    //   const userId = request.params.userId;
  
    //   //create new update
    //   const newUpdate = new Update ({
    //     bookId: bookId,
    //     dailyWordCount: dailyWordCount,
    //     notes: notes,
    //     userId: userId
    //   });
  
      
    // });

  //add chapter

  //get user

  //get books

  //get goals

  //get chapters

  //get updates

  //get word count

}
