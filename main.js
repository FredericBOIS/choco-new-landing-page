const express = require('express');
const https = require('https');
const fs = require('fs');
const db = require('./models/index');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const mailchimp = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP_API_KEY);


credentials = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8')
};

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.enable('trust proxy');
server.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
});

server.listen(80);
https.createServer(credentials, server).listen(443, () => { console.log('server listening on port 443') });

server.get('/', async (req, res) => {
    res.sendFile('landing-page.html', { root: __dirname });
});

server.post('/signup', async (req, res) => {
    try {
        const cust = req.body;
        await db.customers.create({
            firstname: cust.firstName,
            lastname: cust.lastName,
            company: cust.company,
            email: cust.email,
            phone: cust.phone,
            industry: cust.industry,
        });

        res.end();

        /*
        const message = {
            from_email: process.env.MAIL_FROM_ADDRESS,
            subject: `A new account signed up for DoorDash Packaging: ${cust.business_name}`,
            text: `A new account signed up for DoorDash Packaging:

Business name: ${cust.business_name}
Street: ${cust.street}
Street number: ${cust.number}
Postcode: ${cust.postcode}
City: ${cust.city}
Country: ${cust.country},
Email: ${cust.email},
Phone number: ${cust.dial_code + cust.mobile_number}`,
            to: [{ email: process.env.MAIL_TO_ADDRESS, type: "to" }]
        };

        const response = await mailchimp.messages.send({ message });
*/
    }
    catch (error) {
        console.log(error);
        res.status(500).end();
/*
        const message = {
            from_email: process.env.MAIL_FROM_ADDRESS,
            subject: `ERROR during new sign-up occurred on doordash-choco.com!`,
            text: `Request data:

${JSON.stringify(req.body)}            
            
            Error:

${error}`,
            to: [{ email: process.env.MAIL_TO_ADDRESS, type: "to" }]
        };
        
        const response = await mailchimp.messages.send({ message });
        */
    }
});


server.use('/files', express.static(path.dirname(require.main.filename) + '/public'));


server.use('*', async (req, res) => {
    res.sendFile('notfound.html', { root: __dirname });
});