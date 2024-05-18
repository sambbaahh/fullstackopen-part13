import 'dotenv/config';
import { Sequelize, Model, DataTypes } from 'sequelize';
import express from 'express';

const app = express();

export const sequelize = new Sequelize(process.env.DATABASE_URL);

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note',
  }
);

app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
