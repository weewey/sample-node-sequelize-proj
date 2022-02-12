export default (sequelize, DataTypes) => {
    return sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your name'
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: {
                args: false,
                msg: 'Please enter your age'
            },
            validate: {
                min: 0
            }
        },
        gender: {
            type: DataTypes.ENUM(["M", "F"]),
            allowNull: {
                args: false,
                msg: 'Please enter a gender'
            },
            validate: {
                isIn: {
                    args: [['M', 'F']],
                    msg: "Only either M or F is allowed in gender",
                },
            },
        }
    }, {});
};
