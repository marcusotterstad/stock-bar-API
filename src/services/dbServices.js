const pool = require('../configs/db.config');

// A middleware function for all GET queries. This is to follow the DRY code principle, and make the code simpler to read. It's also easy to add new GET queries using this function.
const getQuery = (queryString) => {

    // returns a callback express function used for routing
    return (req, res, next) => {
        pool.query(queryString, (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(results.rows);
        })
    }

}


const getMenu = () => {
   return getQuery('SELECT * FROM menu');
};

const getUnfulfilledOrders = () => {
    return getQuery('SELECT * FROM menu WHERE fulfilled = false');
}

const getOrderTotals = () => {
    return getQuery('SELECT orders.ord_no as order, SUM(menu.price*orders.amount) as total FROM menu INNER JOIN orders ON menu.id = orders.drink_id GROUP BY orders.ord_no');
}

const addOrder = (id, date, drink_id, amount) => {
    return (req, res, next) => {
        pool.query('INSERT INTO orders (ord_no, ord_date, drink_id, amount, fulfilled) VALUES ($1, $2, $3, $4, false) RETURNING *', [id, date, drink_id, amount], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Order added with ID: ${id}. Fulfilling order soon.`);
        })
    }
};


const fulfillOrder = (req, res, next) => {
    return (req, res, next) => {
        
    }
};

module.exports = {
    getMenu,
    addOrder,
    getUnfulfilledOrders,
    fulfillOrder,
    getOrderTotals
}