const basePrice = 1000; //in cents
const baseDistance = 5.00; //in km
const pricePerKMPerish = 150; //in cents
const pricePerKMNonPerish = 100; //in cents
const deliveryService = require('../services/deliveryService')


const getDeliveryCost = (req, res) => {
  const { body } = req;
  
  if (
    !body.zone ||
    !body.organization_id ||
    !body.total_distance ||
    !body.item_type 
  ) {
    return;
  }

  //console.log(body)
  total_price = 0
  if(body.total_distance<=baseDistance)
  {
    total_price = basePrice;
  }
  else if(body.total_distance>baseDistance && body.item_type=='perishable')
  {
    total_price = basePrice + pricePerKMPerish*(body.total_distance - baseDistance);
  }
  else if(body.total_distance>baseDistance && body.item_type=='non-perishable')
  {
    total_price = basePrice + pricePerKMNonPerish*(body.total_distance - baseDistance);
  }
  
  res.status(201).send({ status: "OK", data: total_price });
};

const createNewItem = (req, res) => {
  const { body } = req;
  
  if (
    !body.id ||
    !body.type ||
    !body.description
  ) {
    return;
  }
  const newItem = {
    id: body.id,
    type: body.type,
    description: body.description
  };

  const createdItem = deliveryService.createNewItem(newItem);
  
  
  res.status(201).send({ status: "OK", data: createdItem });
};

module.exports = {
  getDeliveryCost,
  createNewItem
};