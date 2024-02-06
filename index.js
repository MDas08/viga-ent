const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.json());


const deliveryRoutes = require('./routes/restaurant');
app.use('/delivery', deliveryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
