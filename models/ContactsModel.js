const Database = require('./Database');

class ContactsModel {
    constructor() {
        this.db = new Database();
    }

    async addContact(name, email, comment, ip) {
        const sql = `INSERT INTO contacts (name, email, comment, ip) VALUES (?, ?, ?, ?)`;
        const params = [name, email, comment, ip];
        
        try {
            const result = await this.db.run(sql, params);
            return result.lastID;
        } catch (error) {
            console.error('Error adding contact:', error);
            throw error;
        }
    }

    async getAllContacts() {
        const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;
        
        try {
            const contacts = await this.db.all(sql);
            return contacts;
        } catch (error) {
            console.error('Error getting contacts:', error);
            throw error;
        }
    }

    close() {
        this.db.close();
    }
}

module.exports = ContactsModel;