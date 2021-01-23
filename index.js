const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
    .then(() => console.log('Database Connected Successfully'))
    .catch((err) => console.log(err));
app.use(express.json());


app.use('/', routes);
//http://localhost:3000/blogs

app.use((req, res, next) => {
    res.status(404).json({ err: 'Not _Found' });

});
app.use((err, req, res, next) => {
    console.log(err);
    //map the error and send it to the user
    if (err instanceof mongoose.Error.ValidationError) {

        return res.status(422).json(err.errors);
    }
    if (err.status === 11100) {
        err.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        err.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
    debugger;
})



const { PORT = 4000 } = process.env;
app.listen(PORT, () => {
    console.log('App IS up and ready', PORT);
})