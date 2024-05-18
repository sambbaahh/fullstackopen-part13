import { sequelize } from './index.js';

const cli = async () => {
  const result = await sequelize.query('SELECT * FROM blogs', {
    type: sequelize.QueryTypes.SELECT,
  });

  result.forEach((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
  });
};

cli();
