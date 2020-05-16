import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/react-redux-crud';

function validate(data) {
  let errors = {}
  if (data.title === '') errors.title = "Cant't be empty";
  if (data.cover === '') errors.cover = "Cant't be empty";
  if (data.price === '') errors.price = "Cant't be empty";
  if (data.amount === '') errors.amount = "Cant't be empty";
  if (data.category === '') errors.category = "Cant't be empty";
  if (data.name === '') errors.name = "Cant't be empty";
  if (data.surname === '') errors.surname = "Cant't be empty";
  if (data.email === '') errors.email = "Cant't be empty";
  if (data.category === '') errors.category = "Cant't be empty";
  if (data.sallary === '') errors.sallary = "Cant't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid }
}

mongodb.MongoClient.connect(dbUrl, (err, db) => {
  app.get('/api/cargos', (req, res) => {
    db.collection('cargos').find({}).toArray((err, cargos) => {
      res.json({ cargos });
    })
  });

  app.get('/api/employees', (req, res) => {
    db.collection('employees').find({}).toArray((err, employees) => {
      res.json({ employees });
    })
  });

  app.post('/api/cargos', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, cover, price, amount, category } = req.body;
      db.collection('cargos').insert(
        { title, cover, price, amount, category },
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

  app.put('/api/cargos/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, cover, price, amount, category } = req.body;
      db.collection('cargos').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        {  $set: { title, cover, price, amount, category } },
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

  app.get('/api/cargos/:_id', (req, res) => {
    db.collection('cargos').findOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, game) => { res.json({ cargo }) }
    )
  });

  app.get('/api/employees/:_id', (req, res) => {
    db.collection('employees').findOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, game) => { res.json({ employee }) }
    )
  });

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

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Something went wrong"
      }
    })
  });

  app.listen(8080, () => console.log('Server is running on localhost:8080'));
});
