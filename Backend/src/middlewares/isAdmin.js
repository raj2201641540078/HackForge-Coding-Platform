const isAdmin = (req, res, next) => {
    try {
        const {role} = req.payload;

        if(role != "admin")
            throw new Error("Not an admin");

        req.isAdmin = true;

        next();
    } catch(error) {
        res.status(401).send("Error: " + error.message); 
    }
}

module.exports = isAdmin;