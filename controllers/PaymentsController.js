const PaymentsModel = require('../models/PaymentsModel');

class PaymentsController {
    async add(req, res) {
        try {
            const { 
                service, 
                email, 
                card_name, 
                card_number, 
                exp_month, 
                exp_year, 
                cvv 
            } = req.body;
            
            const ip = req.ip || req.connection.remoteAddress;
            
            // Validaciones básicas
            if (!service || !email || !card_name || !card_number || !exp_month || !exp_year || !cvv) {
                return res.status(400).send('Todos los campos son requeridos');
            }

            // Validación simple de tarjeta (solo para ejemplo)
            if (card_number.length < 13 || card_number.length > 19) {
                return res.status(400).send('Número de tarjeta inválido');
            }

            // Determinar el monto según el servicio (en un caso real, esto vendría de la BD)
            let amount;
            switch(service) {
                case 'corte': amount = 25; break;
                case 'barba': amount = 20; break;
                case 'color': amount = 60; break;
                case 'completo': amount = 80; break;
                default: amount = 0;
            }

            const model = new PaymentsModel();
            const paymentId = await model.addPayment(
                service, 
                email, 
                card_name, 
                card_number, 
                amount, 
                'USD', 
                ip
            );
            model.close();

            res.render('payment-confirmation', { paymentId });
        } catch (error) {
            console.error('Error in PaymentsController.add:', error);
            res.status(500).send('Error al procesar el pago');
        }
    }
}

module.exports = PaymentsController;