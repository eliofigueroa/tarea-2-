const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const ContactsController = require('./controllers/ContactsController');
const PaymentsController = require('./controllers/PaymentsController');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Añadido para manejar JSON
app.use(express.static(path.join(__dirname, 'public')));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


const contactsController = new ContactsController();
const paymentsController = new PaymentsController();

// Rutas
app.get('/', (req, res) => {
    res.render('index', { 
        contactSuccess: req.query.contact === 'success',
        paymentSuccess: req.query.payment === 'success'
    });
});

app.post('/contact/add', contactsController.add.bind(contactsController));
app.get('/admin/contacts', contactsController.index.bind(contactsController));


app.post('/payment/add', paymentsController.add.bind(paymentsController));


app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});