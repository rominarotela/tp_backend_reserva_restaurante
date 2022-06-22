module.exports = (sequelize, Sequelize) => {
    const Consumo = sequelize.define("Consumo", {
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

        //1 - True: abierto, 0 - False: cerrado
        estado: {
            type: Sequelize.BOOLEAN,
        },

        fecha_creacion: {
            type: Sequelize.DATE
        },

        fecha_cierre: {
            type: Sequelize.DATE
        },

        id_producto: {
            type: Sequelize.BIGINT,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Productos',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },

        subtotal: {
            type: Sequelize.INTEGER
        },

        cantidad: {
            type: Sequelize.INTEGER
        },

    });

    // const DetalleConsumo = sequelize.define("detalle", {
    //     //id de producto
    //     id: {
    //         type: Sequelize.INTEGER,
    //         primaryKey: true
    //     },
    //     subtotal: {
    //         type: Sequelize.INTEGER
    //     },
    //     cantidad: {
    //         type: Sequelize.INTEGER
    //     },
    // });
    //
    // Consumo.hasMany(DetalleConsumo, {
    //     foreignKey: 'id'
    // });
    // DetalleConsumo.belongsTo(Consumo);
    //
    // // Consumo.hasMany(DetalleConsumo,{ foreignKey: {allowNull: false,name:'id_consumo'}});
    // // DetalleConsumo.belongsTo(Consumo, { foreignKey: {allowNull: false,name:'id_consumo'}});
    return Consumo;
};


// export {Consumo};
// export {DetalleConsumo};


