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
      // streakDays: Math.round(Math.random() * 14),
      // totalWordCount: Math.round(Math.random() * 30000),
      dailyGoal: Math.round(Math.random() * 2000)
    })
    fakeAuthor.save((error, addedUser) => {
      if (error) response.send(error)
      console.log(addedUser)
      response.send("user added");
    })

  })

  app.get('/api/generate-fake-books/:username', (request, response) => {
    let fakeUser = request.params.username;
    let fakeBooks = []
    // let fakeChapters = [];
    let bookLengths = [50000, 60000, 70000, 80000, 90000, 100000];
    for (let i = 0; i < 3; i++) {
      let titles = [
        "The Twisted Turnip",
        "The Boxcar Parents",
        "The Case of the Mysterious object Object"
      ]
      let summaries = [
        "A character discovers they have the ability to visit the past and future, but at the risk that they'll lose something valuable.",
        "A man moves to a rural town to get away from his troubles but trouble keeps finding him.",
        "During the railroad boom, a group of homesteaders tries to keep up with a changing society."
      ]
      let fakeDeadline = faker.date.between('2020-12-01', '2021-08-01')
      let fakeStartDate = faker.date.between('2020-04-01', '2020-07-01')
      const fakeBook = {
        title: titles[i],
        description: summaries[i],
        expectedLength: bookLengths[Math.floor(Math.random() * bookLengths.length)],
        deadline: fakeDeadline,
        chapters: [],
        startDate: fakeStartDate
      }

      // fakeBook.progress = Math.round(Math.random() * fakeBook.expectedLength / 2)
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
        "	The Letters from No One",
        "	The Keeper of Keys",
        " Lighter Than A Feather",
        "	An Empty Ink Bottle",
        " Use a Pebble",
        "	Partings, and A Meeting",
        "The End of a Legend",
        "The Midnight Duel",
        "A Storm of Light",
        "An Invitation",
        "A Reunion",
        "Questions of Leadership",
        "The End of a Legend"
      ]
      for (let i = 0; i < 25; i++) {
        let fakeChapterDate = faker.date.between('2020-09-01', '2021-01-01')

        book.chapters.push({
          title: chapterTitles[Math.floor(Math.random() * chapterTitles.length)],
          number: i + 1,
          description: summaries[Math.floor(Math.random() * summaries.length)],
          deadline: fakeChapterDate,
          expectedLength: chapterLengths[Math.floor(Math.random() * chapterLengths.length)],
          completed: completedStatus[Math.floor(Math.random() * completedStatus.length)]
        })
      }
      // book.chapters.forEach(chapter => {
      //   chapter.progress = Math.round(Math.random() * (chapter.expectedLength / 3));
      //   if (chapter.progress >= chapter.expectedLength) {
      //     chapter.completed = true;
      //   }
      // })
      
      // let progressToDate = book.chapters.reduce((sum, chapter) => {
      //   let subTotal = sum + chapter;
      //   return subTotal;
      // }, 0);
      
      // book.totalWordCount = progressToDate;
    })

  

    User
      .findOneAndUpdate({ username: fakeUser }, { books: fakeBooks }, { runValidators: true })
      .exec((error, updatedUser) => {
        if (error) response.send(error);
        response.send(updatedUser)
      })

  })

  app.get('/api/generate-fake-updates/:username', (request, response) => {
    let fakeUser = request.params.username;
    
    
    

    User
      .findOne({ username: fakeUser })
      .exec((error, user) => {
        let fakeUpdates = []
        user.books.forEach(book => {
          let fakeChapters = []
          book.chapters.forEach(chapter => {

            let fakeProgress = Math.round(Math.random() * 1500)
            let completedStatus = [false, false, true, false]
            fakeChapters.push({
              bookTitle: book.title,
              chapterTitle: chapter.title,
              chapterNumber: chapter.number,
              progress: fakeProgress,
              expectedLength: chapter.expectedLength,
              completed: completedStatus[Math.floor(Math.random() * completedStatus.length)]
            })
          })

          for (let i = 0; i < 30; i++) {
            let fakeUpdateDate = faker.date.between('2020-04-01', '2020-07-15')
            fakeChapterUpdate = Object.assign({}, fakeChapters[Math.floor(Math.random() * fakeChapters.length)])
console.log("fake chapter update", fakeChapterUpdate)
            fakeUpdates.push({
              bookTitle: book.title,
              expectedLength: book.expectedLength,
              progress: fakeChapterUpdate.progress,
              chapterUpdate: Object.assign({}, fakeChapterUpdate),
              date: fakeUpdateDate,
              
            })
          }

         
          fakeUpdates.map(update => {
            if (update.bookTitle == book.title) {
              book.progress += update.progress;
            }
 
               book.chapters.map(chapter => {
                 if (chapter.number == update.chapterUpdate.chapterNumber) {
                   chapter.progress += update.chapterUpdate.progress;
                 }
               })
           })
          
        })
        user.books.forEach(book => {
           book.progress = user.updates.reduce((acc, update) => {
            return update.progress + acc;
          }, 0)
        })

        // console.log("FAKE UPDAAAAAAAAAAAAAAATE", fakeUpdates)
        user.updates = fakeUpdates;
        user.save((error, updatedUser) => {
          if (error) {
            response.send(error);
          } else {
            response.send("updates added")
          }
        })

       
           
      });
  })

  app.get('/api/fixtotal/:username', (request, response) => {
    User.findOne({ username: request.params.username }).exec((error, user) => {
      user.books.forEach(book => {
        let bookTotal = 0;
        user.updates.forEach((update) => {
          if (update.bookTitle == book.title) {
            // console.log("UPDATE", acc)
           bookTotal += update.progress
            
          }
        })
        console.log("BOOK TOTAL", bookTotal)
        
        book.progress = bookTotal
      })

      user.save((error, savedUser) => {
        if (error) response.send(error);
        response.send("Fixed user total")
      })
    })
  })

  //add book
  app.post('/api/users/:username/book', (request, response) => {
    //get book info from request
    const title = request.body.title;
    const description = request.body.description;
    const expectedLength = request.body.expectedLength;
    const deadline = request.body.deadline;
    const username = request.params.username;
    const totalWordCount = request.body.totalWordCount;
    const startDate = request.body.startDate || new Date();
    const dailyGoal = request.body.dailyGoal;

    //create new book
    const newBook = {
      title,
      description,
      expectedLength,
      deadline,
      totalWordCount,
      startDate,
      dailyGoal
    };


    //find user and add new book ID to books array
    User
      .findOneAndUpdate({ username: username }, { $push: { books: [newBook] } }, { runValidators: true })
      .exec((error, updatedUser) => {
        if (error) response.send(error)
        response.send(updatedUser)
      })
  })



  //get user
  app.get('/api/users/:username', (request, response) => {
    //find user
    User
      .findOne({ username: request.params.username })
      .exec((error, user) => {
        if (error) response.status(404).send(error)
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
  app.post('/api/users/:username/update', (request, response) => {
    //get update info from request
    const update = request.body.update;
    const username = request.params.username;
    const progress = Number(request.body.update.progress)
    

    //add update to user
    User
      .findOne({ username: username })
      .exec((error, updatedUser) => {
        if (error) response.send(error)

        updatedUser.updates.push(update);
        //update total words
        updatedUser.totalWordCount += progress;

        updatedUser.books.forEach(book => {
          if (book.title == update.bookTitle) {
            let newBookTotal = Number(book.progress) + Number(update.progress);
            book.progress = newBookTotal

            book.chapters.forEach(chapter => {
              if (chapter.title == update.chapterUpdate.chapterTitle) {
                let newChapterTotal = chapter.progress + update.progress;
                chapter.progress = newChapterTotal;

                // chapterToUpdate.progress += progress;
        chapter.completed = update.chapterUpdate.completed || false;
              }
            })
          }
        });

        // const chapterToUpdate = bookToUpdate.chapters.find(chapter => {
        //   return chapter.number == update.chapterUpdate.chapterNumber;
        // })

        

        updatedUser.save((error, user) => {
          if (error) response.send(error)
          response.send(user)
        })
      })
  })


  // });

  //add chapter
  app.post('/api/users/:username/chapter', (request, response) => {
    //get update info from request
    const chapter = request.body.chapter;
    const username = request.params.username;
    const progress = Number(request.body.chapter.progress)
    

    //add update to user
    User
      .findOne({ username: username })
      .exec((error, user) => {
        if (error) response.send(error)
        //update total words
        user.totalWordCount += progress;

        const bookToUpdate = user.books.find(book => {
          return book.title == request.body.bookTitle;
        });

        bookToUpdate.progress += progress;

        bookToUpdate.chapters.push(chapter);

        user.save((error, updatedUser) => {
          if (error) response.send(error)
          response.send(updatedUser)
        })
      })
  })

  //get user

  //get books

  //get goals

  //get chapters

  //get updates

  //get word count

}
