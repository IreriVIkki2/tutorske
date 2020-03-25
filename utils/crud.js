const { client } = require("./client");
const {profile} = require("./init");

class Crud {
    constructor() {
        this.state = {
            message: "this is a testing message",
        };
    }

    /**
     * @param {Date} myDate The date of message
     * @param {string} message The message you want to add
     * @returns {string} this returns a string of your message concatenated with a predefined string
     */
    test(myDate, message) {
        return console.log(this.state.message + " --- " + message);
    }

    /**
     * @method getGradeQuestions This method fetches all the methods from a database and returns only the object that are useful
     * @param {String} number number of the grade
     * @returns {Promise <[questions]>} This returns a promise which resolves an array of all questions
     */
    getGradeQuestions(grade) {
        return new Promise((resolve, reject) => {
            client()
                .db.collection("questions")
                .get(grade)
                .then(snapshot => {
                    let questions = [];
                    snapshot.forEach(doc => questions.push(doc.data()));
                    resolve(questions);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * @method createUserProfile This method creates a new user profile upon registration
     *
     * @param {String} uid id of the user
     *
     * @returns {Promise <{profile}>} This returns a promise which resolves to a profile object
     */

    createUserProfile(uid) {
        return new Promise(async (resolve, reject) => {
            const newProfile = profile();

            await firebaseClient()
                .db.collection("profiles")
                .doc(uid)
                .set(newProfile)
                .then(() => resolve(newProfile._id))
                .catch(err => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

}

module.exports = new Crud();