import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/react-redux-crud';

function validate(data) {
  let errors = {}
  // CARGOS
  if (data.title === '') errors.title = "Cant't be empty";
  if (data.cover === '') errors.cover = "Cant't be empty";
  if (data.price === '') errors.price = "Cant't be empty";
  if (data.sellPrice === '') errors.sellPrice = "Cant't be empty";
  if (data.amount === '') errors.amount = "Cant't be empty";
  if (data.category === '') errors.category = "Cant't be empty";

  // EMPLOYEES
  if (data.name === '') errors.name = "Cant't be empty";
  if (data.surname === '') errors.surname = "Cant't be empty";
  if (data.email === '') errors.email = "Cant't be empty";
  if (data.category === '') errors.category = "Cant't be empty";
  if (data.sallary === '') errors.sallary = "Cant't be empty";

  // CARGOS CATEGORY
  if (data.category.name === '') errors.category = "Cant't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid }
}

mongodb.MongoClient.connect(dbUrl, (err, db) => {

  // CATEGORY
  // Create new category
  app.post('/api/categories', (req, res) => {
    const { name } = req.body;

    db.collection('categories').insert({ name }, (err, result) => {
      if (err) {
        res.status(500).json({ errors: { global: "Something went wrong" }});
      } else {
        res.json({ category: result.ops[0] });
      }
    });
  });

  // Get categories
  app.get('/api/categories', (req, res) => {
    db.collection('categories').find({}).toArray((err, categories) => {
      res.json({ categories });
    });
  })
  
  // CARGOS
  // Get cargos
  app.get('/api/cargos', (req, res) => {

    // const { category: categoryId } = req.query;

    // db.collection('cargos').find({
    //   "category.name": categoryId,
    // }).toArray((err, cargos) => {
    //   res.json({ cargos });
    // })

    db.collection('cargos').find({}).toArray((err, cargos) => {
      res.json({ cargos });
    })
  });

  // Create cargo
  app.post('/api/cargos', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, cover, price, sellPrice, amount, category } = req.body;
      db.collection('cargos').insert(
        { title, cover, price, sellPrice, amount, category },
        (err, result) => {
          if (err) {
            res.status(500).json({ errors: { global: "Something went wrong" }});
          } else {
            res.json({ cargo: result.ops[0] });
          }
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  // Update cargo
  app.put('/api/cargos/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      res.status(500)
      const { title, cover, price, sellPrice, amount, category } = req.body;
      db.collection('cargos').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        {  $set: { title, cover, price, sellPrice, amount, category } },
        { returnOriginal: false },
        (err, result) => {
          if (err) {
            res.status(500).json({ errors: { global: err }});
          } else {
            res.json({ cargo: result.value });
          }
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  // Get choosen cargo
  app.get('/api/cargos/:_id', (req, res) => {
    db.collection('cargos').findOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, game) => { res.json({ cargo }) }
    )
  });

  // Delete cargo
  app.delete('/api/cargos/:_id', (req, res) => {
    db.collection('cargos').deleteOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: err }});
        } else {
          res.json({});
        }
      }
    )
  });




// EMPLOYEES
// Get employees
  app.get('/api/employees', (req, res) => {
    db.collection('employees').find({}).toArray((err, employees) => {
      res.json({ employees });
    })
  });

// Create employee
  app.post('/api/employees', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { name, surname, email, category, sallary } = req.body;
      db.collection('employees').insert(
        { name, surname, email, category, sallary },
        (err, result) => {
          if (err) {
            res.status(500).json({ errors: { global: "Something went wrong" }});
          } else {
            res.json({ employee: result.ops[0] });
          }
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

// Update employee
  app.put('/api/employees/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { name, surname, email, category, sallary } = req.body;
      db.collection('employees').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        {  $set: { name, surname, email, category, sallary } },
        { returnOriginal: false },
        (err, result) => {
          if (err) {
            res.status(500).json({ errors: { global: err }});
          } else {
            res.json({ employee: result.value });
          }
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

// Get choosen employee
  app.get('/api/employees/:_id', (req, res) => {
    db.collection('employees').findOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, game) => { res.json({ employee }) }
    )
  });

// Delete employee
  app.delete('/api/employees/:_id', (req, res) => {
    db.collection('employees').deleteOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: err }});
        } else {
          res.json({});
        }
      }
    )
  });

// Error handler
  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Something went wrong"
      }
    })
  });

// Message when server successfully started  
  app.listen(8080, () => console.log('Server is running on localhost:8080'));
});
