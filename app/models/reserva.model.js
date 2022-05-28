module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
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

        mesa: {
            type: Sequelize.BIGINT,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Mesas',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },

        fecha: {
            type: Sequelize.DATE
        },

        cliente: {
            type: Sequelize.BIGINT,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Clientes',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },

        cantidad_mesa: {
            type: Sequelize.BIGINT,
        },
    });
    return Reserva;
};
