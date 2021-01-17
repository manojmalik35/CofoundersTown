
module.exports = {
    transformUser: function (user) {
        const { _id, name, email, createdAt, updatedAt, age, articles } = user;
        const obj = {
            id: _id,
            name,
            email,
            created_at: createdAt,
            updated_at: updatedAt,
        }

        if (age) obj.age = age;
        if (articles && articles.length) {
            if (typeof articles[0] == "object") {
                obj.articles = articles.map(art => {
                    const { _id, title, description, body, tags } = art;
                    return { id: _id, title, description, body, tags }
                })
            } else {
                obj.articles = articles;
            }
        }
        return obj;
    }
}
