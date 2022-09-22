module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        lastLogin: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })

    return User
}