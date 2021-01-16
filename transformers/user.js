module.exports.transformUser = function (user) {
    const obj = {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    }

    if (user.age) obj.age = user.age;
    return obj;
}