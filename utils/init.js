const { v4: uuid } = require("uuid");

/**
 * @function
 *
 * @param {uid} string Id of the user
 *
 * @returns {Object} This returns a new user profile object
 */
const profile = user => {
    return {
        kind: "user/profile",
        _id: user.uid,

        isAdmin: false,
        isTutor: false,
        isParent: false,

        displayName: user.displayName,
        photoUrl: user.photoURL,
        fullName: "",
        firstName: "",
        lastName: "",
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAnonymous: user.isAnonymous,

        registeredAt: Date.now(),
        updatedAt: Date.now(),
    };
};

module.exports = { profile };
