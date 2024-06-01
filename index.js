const express = require('express');
require('express-async-errors');

const { PORT } = require('./util/config');
const blogsRouter = require('./controllers/blogs');
const authorRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readingLists');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const errorHandler = require('./middlewares/errorHandler');
const { connectToDatabase } = require('./util/db');

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readingListRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});
