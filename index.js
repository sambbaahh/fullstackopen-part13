import express from 'express';
import 'express-async-errors';

import { PORT } from './util/config.js';
import blogsRouter from './controllers/blogs.js';
import userRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
