const Sequelize = require('sequelize');

const sequelize = new Sequelize('guestly', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  facebook: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  twitter: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  messenger: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

const Listing = sequelize.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
  },
  totalRatings: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Photo = sequelize.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'id',
    },
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tinyPhotoUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  priority: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  caption: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const List = sequelize.define('list', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'id',
    },
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(res => console.log('Connection Established!'))
  .catch(err => console.log(err));

module.exports = {
  sequelize, User, Listing, Photo, List,
};
