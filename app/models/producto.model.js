module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", {
        nombre: {
            type: Sequelize.STRING
        },

        precio_venta: {
            type: Sequelize.BIGINT,
        },

        categoria: {
            type: Sequelize.BIGINT,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'Categoria',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },

        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Producto;
};