const { connect } = require('mongoose');

async function connectDB() {
  try {
    await connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect successfully!');
  } catch (error) {
    console.log('Connect failure!');
  }
}

module.exports = { connectDB };
