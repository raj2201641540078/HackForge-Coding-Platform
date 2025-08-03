const getUserCheckedProblems = async (req, res) => {
    const { user } = req;
    try{

        const checkedProblems = user.checkedProblems || [];
        const bookmarks = user.bookmarks || [];
        const liked = user.likedProblems ? user.likedProblems.length : 0;
        const favorited = user.favouriteProblems ? user.favouriteProblems.length : 0;
        const userProblems = {
            liked,
            favorited
        }

        const reply = { checkedProblems, bookmarks, userProblems };

        res.status(200).json(reply);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    } 
}

module.exports = getUserCheckedProblems;