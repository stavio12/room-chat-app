const admin = require("firebase-admin");

admin.initializeApp();

exports.userStatusChanged = require("./triggers/statusChange");
// exports.helloWorld = require("./routers/helloWorld");
exports.chatBot = require("./triggers/chatBot");
