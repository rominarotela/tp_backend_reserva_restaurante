module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        nombre_mesa: {
            type: Sequelize.STRING
        },

        restaurante: {
            type: Sequelize.BIGINT,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Restaurantes',
                key: 'id_restaurante'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },

        posicion_x: {
            type: Sequelize.BIGINT
        },

        posicion_y: {
            type: Sequelize.BIGINT
        },

        nro_piso: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        capacidad: {
            type: Sequelize.INTEGER,
        },

        ocupado: {
            type : Sequelize.BOOLEAN,
        },

        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Mesa;
};

// Se modificará el modelo de la mesa para verificar si una mesa esta ocupada o no.
