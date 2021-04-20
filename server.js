const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const MONGODB_URI = 'mongodb+srv://harmanmartin:myDataBasePassCOMP426@cluster0.fop0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const routes = require('./routes/api');

mongoose.connect(MONGODB_URI || 'mongodb://localhost/Comp426Backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));