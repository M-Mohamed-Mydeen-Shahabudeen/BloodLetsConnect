const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const donorRoutes = require('./routes/donors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/donors', donorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', require('./routes/requests'));
app.use('/api/notifications', require('./routes/notifications'));

app.get('/', (req, res) => {
    res.send('Blood Donor API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
