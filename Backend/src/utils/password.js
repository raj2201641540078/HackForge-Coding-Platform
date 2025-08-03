const bcrypt = require("bcrypt");

password = {
    hash: async (password) => {
        return await bcrypt.hash(password, 10);
    },

    compare: async (givenPassword, realPassword) => {
        return await bcrypt.compare(givenPassword, realPassword); 
    }
}


module.exports = password;