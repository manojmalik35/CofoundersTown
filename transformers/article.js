
module.exports = {
    transformArticle: function (article) {
        const { _id, title, description, body, createdAt, updatedAt, tags, author } = article;
        let obj = {
            id: _id,
            title,
            description,
            body,
            created_at: createdAt,
            updated_at: updatedAt,
        }

        if (tags && tags.length) obj.tags = tags
        if (author) {
            const { _id, name, email } = author;
            obj.author = {
                id: _id, name, email
            }
        }
        return obj;
    }
}