const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

// 각 모데들을 시퀄라이즈 객체에 연결 
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

// 각 모델간의 관계 설정 
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;