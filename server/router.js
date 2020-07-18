const Authentication = require('./controllers/authentication');
require('./services/passport');
const passport = require('passport');
const User = require('./models/user');
const Book = require('./models/book');
const Chapter = require('./models/chapter');
const Goal = require('./models/goal');
const Update = require('./models/update');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const faker = require('faker');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  /*
  //login and authentication
  app.post('/auth/signup', Authentication.signup);
  app.post('/auth/signin', requireSignin, Authentication.signin);

  //get current user
  app.get('/auth/current_user', requireAuth, Authentication.currentUser);
*/

  app.get('/api/generate-fake-user/:username', (request, response) => {
    const fakeAuthor = new User({
      username: request.params.username,
      streakDays: Math.round(Math.random() * 14)
    })
    fakeAuthor.save((error, addedUser) => {
      if (error) response.end(error)
      console.log(addedUser)
      response.send("user added");
    })

  })

  app.get('/api/generate-fake-books/:username', (request, response) => {
    let fakeUser = request.params.username;
    let fakeBooks = []
    // let fakeChapters = [];
    let bookLengths = [20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    for (let i = 0; i < 3; i++) {
      let titles = [
        "The Unusual Travelers",
        "Finding His Way",
        "A New Track"
      ]
      let summaries = [
        "A character discovers they have the ability to visit the past and future, but at the risk that they'll lose something valuable.",
        "A man moves to a rural town to get away from his troubles but trouble keeps finding him.",
        "During the railroad boom, a group of homesteaders tries to keep up with a changing society."
      ]
      let fakeDate = faker.date.future();

      let fakeBook = {
      title: titles[i],
      description: summaries[i],
      expectedLength: bookLengths[Math.floor(Math.random() * bookLengths.length)],
      deadline: fakeDate,
      chapters: []
    };

    fakeBook.progress = Math.round(Math.random() * (fakeBook.expectedLength / 2))

      fakeBooks.push(fakeBook)
    }

    fakeBooks.forEach(book => {
      let summaries = [
        "A character moves to a new town and pretends to be someone they used to know.",
        "Two characters fall in love with each other, when they shouldn't.",
        "A robot becomes self aware in the midst of a war it was purchased to fight.",
        "A hidden society figures out how to reveal itself to the rest of the world.",
        "A character travels back in time, where they realize they are more important than modern day.",
        "A scientist uncovers a secret portal that leads to a life changing future.",
        "A fantasy character kills someone they loathe and must cover up the evidence.",
        "A character develops the power to alter their personality, but cannot control it.",
        "A group of characters attempt to explain their experiences traveling through a desert.",
        "A war hero returns home and attempts to make connections with old friends.",
        "A character finds a journal with half of the pages filled and works to respond to their story.",
        "A group of orphans attempt to make a home of their own.",
        "A character confronts their illogical but deeply real fear of being sucked down by the bathtub drain.",
        "A girl from India struggles to reconnect with her estranged family.",
        "Three strangers win a getaway vacation together",
        "A character discovers they have the ability to visit the past and future, but at the risk that they'll lose something valuable.",
        "Two separate families become one after a marriage unites them.",
        "A mermaid lures a character into a life undersea.",
        "A granddaughter attempts to connect with her long-lost grandmother by cooking through the family cookbook.",
      ]
      let completedStatus = [false, false, true, false]
      let chapterLengths = [200, 500, 1000, 1500, 2000, 2500, 3000, 4000, 4500, 5000];
      let chapterTitles = [
        "An Unexpected Letter",
        "The Vanishing Glass",
        "The Letters from No One",
        "The Keeper of Keys",
        "Lighter Than A Feather",
        "An Empty Ink Bottle",
        "Use a Pebble",
        "Partings, and A Meeting",
        "The End of a Legend",
        "The Midnight Duel",
        "A Storm of Light",
        "An Invitation",
        "A Reunion",
        "Questions of Leadership",
        "The End of a Legend"
      ]
      for (let i = 0; i < 25; i++) {
        let fakeChapterDate = faker.date.future()

        book.chapters.push({
          title: chapterTitles[Math.floor(Math.random() * chapterTitles.length)],
          number: i + 1,
          description: summaries[Math.floor(Math.random() * summaries.length)],
          deadline: fakeChapterDate,
          expectedLength: chapterLengths[Math.floor(Math.random() * chapterLengths.length)],
          completed: completedStatus[Math.floor(Math.random() * completedStatus.length)]
        })
      }
      book.chapters.forEach((chapter) => {
        chapter.progress = Math.round(Math.random() * chapter.expectedLength);
        if (chapter.progress >= chapter.expectedLength) {
          chapter.completed = true;
        }
      })
    })

    User
      .findOneAndUpdate({ username: fakeUser }, { books: fakeBooks }, { runValidators: true })
      .exec((error, updatedUser) => {
        if (error) response.send(error);
        response.send(updatedUser)
      })

  })

  app.get('/api/generate-fake-updates/:username/', (request, response) => {
    let fakeUser = request.params.username;
    
    
    User.findOneAndUpdate({username: fakeUser}).exec((error, user) => {
    
        const updatedBooks = user.books.map((book) => {
          let fakeChapters = []
          let fakeUpdates = []
          let fakeChapterUpdates = []
          let newUserBookArray = []
          
          book.chapters.forEach(chapter => {
            let fakeProgress = Math.round(Math.random() * chapter.expectedLength)
            fakeChapters.push({
              chapterTitle: chapter.title,
              chapterNumber: chapter.number,
              progress: fakeProgress,
              expectedLength: chapter.expectedLength
            })
          })
          for (let i = 0; i < 3; i++) {
            console.log("fake chapter updates", i)
            fakeChapterUpdates.push(fakeChapters[Math.floor(Math.random() * fakeChapters.length)])
          }

          for (let i = 0; i < 20; i++) {
            console.log("fake update number", i)
            let fakeUpdateDate = faker.date.past()
            fakeUpdates.push({
              bookTitle: book.title,
              progress: Math.round(Math.random() * 2000),
              chapterUpdates: fakeChapterUpdates,
              date: fakeUpdateDate
            })

          }
          book.updates.push(fakeUpdates);
console.log("FAKE UPDATES", fakeUpdates[0].chapterUpdates)
          return book
          
          });
          
            user.books = updatedBooks;
            user.save((error, user) => {
console.log("BOOK ARRAY!!!!!!!!!!!!!!!!!111",updatedBooks)
              if (error) response.send(error)
              response.send("updates added")
            })
         
         
         
        })
        
      })
  

  //add book
  app.post('/api/users/:userId/book', (request, response) => {
    //get book info from request
    const title = request.body.title;
    const description = request.body.description;
    const expectedLength = request.body.expectedLength;
    const deadline = request.body.deadline;
    const userId = request.params.userId;

    //create new book
    const newBook = {
      title: title,
      description: description,
      expectedLength: expectedLength,
      deadline: deadline
    };


    //find user and add new book ID to books array
    User
      .findOneAndUpdate({ _id: userId }, { $push: { books: [newBook] } }, { runValidators: true })
      .exec((error, updatedUser) => {
        if (error) response.end(error)
        response.send(updatedUser)
      })
  })



  //get user
  app.get('/api/users/:username', (request, response) => {
    //find user
    User
      .findOne({ username: request.params.username })
      .exec((error, user) => {
        if (error) response.status(404).end(error)
        response.send(user);
      })
  });

  // //add goal
  // app.post('/api/users/:userId/goals', (request, response) => {
  //   //get goal info from request
  //   const goalStartDate = request.body.goalStartDate;
  //   const goalEndDate = request.body.description;
  //   const goalItem = request.body.goalItem;
  //   const goalType = request.body.goalType;
  //   const notes = request.body.notes;
  //   const userId = request.params.userId;

  //   //create new goal
  //   const newGoal = new Goal({
  //     goalStartDate: goalStartDate,
  //     goalEndDate: goalEndDate,
  //     goalItem: goalItem,
  //     goalType: goalType,
  //     notes: notes,
  //     userId: userId
  //   });

  // //save book and send back response
  //   newGoal.save((error, goalCreated) => {
  //     if (error) response.end(error)
  //     //find user and add new book ID to books array
  //     User
  //       .findOneAndUpdate({ _id: userId }, { $push: { goals: [goalCreated._id] } }, { runValidators: true })
  //       .exec((error, updatedUser) => {
  //         if (error) response.end(error)
  //         response.send(goalCreated)
  //       })
  //   })
  // }); 

  //add update
  // app.post('/api/users/:userId/update', (request, response) => {
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
