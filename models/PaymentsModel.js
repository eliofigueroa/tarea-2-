const Database = require('./Database');

class PaymentsModel {
    constructor() {
        this.db = new Database();
    }

    async addPayment(service, email, cardName, cardNumber, amount, currency, ip) {
        // Solo almacenamos los últimos 4 dígitos por seguridad
        const cardLastFour = cardNumber.slice(-4);
        
        const sql = `INSERT INTO payments 
                    (service, email, card_name, card_last_four, amount, currency, ip) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [service, email, cardName, cardLastFour, amount, currency, ip];
        
        try {
            const result = await this.db.run(sql, params);
            return result.lastID;
        } catch (error) {
            console.error('Error adding payment:', error);
            throw error;
        }
    }

    close() {
        this.db.close();
    }
}

module.exports = PaymentsModel;