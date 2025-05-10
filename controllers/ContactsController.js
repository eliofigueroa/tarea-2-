const ContactsModel = require('../models/ContactsModel');

class ContactsController {
    async add(req, res) {
        try {
            const { name, email, comment } = req.body;
            const ip = req.ip || req.connection.remoteAddress;
            
            if (!name || !email || !comment) {
                return res.status(400).send('Todos los campos son requeridos');
            }

            const model = new ContactsModel();
            await model.addContact(name, email, comment, ip);
            model.close();

            res.redirect('/?contact=success');
        } catch (error) {
            console.error('Error in ContactsController.add:', error);
            res.status(500).send('Error al procesar el formulario');
        }
    }

    async index(req, res) {
        try {
            const model = new ContactsModel();
            const contacts = await model.getAllContacts();
            model.close();

            res.render('admin-contacts', { contacts });
        } catch (error) {
            console.error('Error in ContactsController.index:', error);
            res.status(500).send('Error al obtener los contactos');
        }
    }
}

module.exports = ContactsController;