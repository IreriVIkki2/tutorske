const { v4: uuid } = require("uuid");


/**
 * @function
 *
 * @param {programId} string Id of the associated program
 *
 * @returns {Object} This returns an object with set defaults that is then used to create a new exercise/day in firestore
 */
const profile = uid => {
    const dayId = uuid().replace(/-/g, "");
    return {
        kind: "user/profile",
        _id: uid,
        isAdmin: false,
        isTutor: false,
        isParent: false,
        userName: "",
        profilePhoto: "",
        fullName: "",
        registeredAt: Date.now(),
        updatedAt: Date.now(),
    };
};

mocule.exports = {profile}