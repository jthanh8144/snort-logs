const Log = require('../models/Log');
const { multipleMongooseToObject } = require('../utils/mongoose');
const { sleep } = require('../utils/sleep');

const index = async (req, res, next) => {
  try {
    const logs = await Log.find({}).sort('-dateTime');
    const data = multipleMongooseToObject(logs);
    res.render('index', { logs: data });
    let time = data[0].dateTime;
    while (true) {
      const logs = await Log.find({ dateTime: { $gt: time } }).sort(
        '-dateTime'
      );
      const data = multipleMongooseToObject(logs);
      if (data.length) {
        time = data[0].dateTime;
        global.io.emit('data', { logs: data });
      }
      await sleep(1000);
      if (global.socketActive === false) {
        return;
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { index };
