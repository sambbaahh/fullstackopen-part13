import 'dotenv/config';
import { Sequelize, Model, DataTypes } from 'sequelize';
import express from 'express';

const app = express();
app.use(express.json());

export const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/api/blogs', async (req, res) => {
  const notes = await Blog.findAll();
  res.json(notes);
});

app.post('/api/blogs', async (req, res) => {
  console.log(req.body);
  const blog = await Blog.create(req.body);
  res.json(blog);
});

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
