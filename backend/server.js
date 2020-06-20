import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import { subMonths } from 'date-fns';

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

    const { category: categoryId = '' } = req.query;

    let filter = {};

    if (categoryId) {
      filter = {
        "category._id": categoryId,
      };
    }

    db.collection('cargos').find(filter).toArray((err, cargos) => {
      res.json({ cargos });
    })

    // db.collection('cargos').find({}).toArray((err, cargos) => {
      // res.json({ cargos });
    // })
  });

  // Create cargo
  app.post('/api/cargos', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { title, cover, price, sellPrice, amount, category } = req.body;
      db.collection('cargos').insert(
        {
          title,
          cover,
          price: Number(price),
          sellPrice: Number(sellPrice),
          amount: Number(amount),
          category,
          created_at: new Date(),
        },
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
      const { title, cover, price, sellPrice, amount, category } = req.body;
      
      db.collection('cargos').findOneAndUpdate({
        _id: new mongodb.ObjectId(req.params._id)
      }, {
        $set: {
          title,
          cover,
          price: Number(price),
          sellPrice: Number(sellPrice),
          amount: Number(amount),
          category,
        }
      }, {
        returnOriginal: false
      }, (err, result) => {
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
    db.collection('cargos').findOne({
      _id: new mongodb.ObjectId(req.params._id),
    }, (err, cargo) => {
      if (err) {
        res.status(500).json({ errors: { global: err }});
      } else {
        res.json({ cargo });
      }
    });
  });

  // Delete cargo
  app.delete('/api/cargos/:_id', (req, res) => {
    db.collection('cargos').deleteOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: err }});
        } else {
          res.status(204).json({});
        }
      }
    )
  });




// EMPLOYEES
// Get employees
  app.get('/api/employees', (req, res) => {

    const { category: categoryId = '' } = req.query;

    let filter = {};

    if (categoryId) {
      filter = {
        "category._id": categoryId,
      };
    }

    db.collection('employees').find(filter).toArray((err, employees) => {
      res.json({ employees });
    })
  });

// Create employee
  app.post('/api/employees', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { name, surname, email, category, sallary } = req.body;
      db.collection('employees').insert(
        { name, surname, email, category, sallary: Number(sallary) },
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

      db.collection('employees').findOneAndUpdate({ 
        _id: new mongodb.ObjectId(req.params._id), 
      }, {  
        $set: { name, surname, email, category, sallary: Number() } 
      }, { 
        returnOriginal: false, 
      }, (err, result) => {
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
    db.collection('employees').findOne({
      _id: new mongodb.ObjectId(req.params._id),
    }, (err, employee) => {
      if (err) {
        res.status(500).json({ errors: { global: err }});
      } else {
        res.json({ employee });
      }
    });
  });

// Delete employee
  app.delete('/api/employees/:_id', (req, res) => {
    db.collection('employees').deleteOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: err }});
        } else {
          res.status(204).json({});
        }
      }
    )
  });

  /* REPORTS */

  /**
   * GET reports list
   */
  app.get('/api/reports', (req, res) => {

    const { employee: employeeId = '' } = req.query;

    let filter = {};

    if (employeeId) {
      filter = {
        "employee._id": employeeId,
      };
    }

    db.collection('reports').find(filter).toArray((err, reports) => {
      res.json({ reports });
    })
  });

  // GET get single report
  app.get('/api/reports/:_id', (req, res) => {
    db.collection('reports').findOne({
      _id: new mongodb.ObjectId(req.params._id),
    }, (err, reports) => {
      if (err) {
        res.status(500).json({ errors: { global: err }});
      } else {
        res.json({ reports });
      }
    });
  });

  /**
   * POST create report
   */
  app.post('/api/reports', (req, res) => {
    const { employee, selectedCargos, department } = req.body;

    selectedCargos.forEach(item => {
      db.collection('cargos').findOneAndUpdate({
        _id: new mongodb.ObjectId(item._id)
      }, {
        $inc: {
          amount: item.qty ? -Number(item.qty) : 0,
        },
      });
    });

    db.collection('reports').insert(
      { employee, selectedCargos, department, created_at: new Date() },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global }});
        } else {
          res.status(201).json(result.ops[0]);
        }
      }
    );
  });

  /**
   * DELETE remove report
   */
  app.delete('/api/reports/:_id', (req, res) => {
    db.collection('reports').deleteOne(
      { _id: new mongodb.ObjectId(req.params._id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: err }});
        } else {
          res.status(204).json({});
        }
      }
    )
  });

  /* DASHBOARD */

  app.get('/api/analytics', (req, res) => {
    db.collection('cargos').aggregate([{
      $match: {
        created_at: {
          $gte: subMonths(new Date(), 1),
        },
      },
    }, {
      $group: {
        _id: '',
        "price": {
          $sum: '$price',
        },
      }
    }, {
      $project: {
        _id: 0,
        "TotalPrice": "$price"
      },
    }], (err, result) => {
      console.log('RESULT: ', result);
    });
    res.json({ data: 'success' });
  });

  app.get('/api/analytics', (req, res) => {
    db.collection('cargos').aggregate([{
      $match: {
        created_at: {
          $gte: subMonths(new Date(), 1),
        },
      },
    }, {
      $group: {
        _id: '',
        "price": {
          $sum: '$price',
        },
      }
    }, {
      $project: {
        _id: 0,
        "TotalPrice": "$price"
      },
    }], (err, result) => {
      console.log('RESULT: ', result);
    });
    res.json({ data: 'success' });
  });

  // Витрачено коштів на закупку товару за останній місяць
  // app.get('/api/analytics', (req, res) => {
  //   db.collection('cargos').aggregate([{
  //     $match: {
  //       created_at: {
  //         $gte: subMonths(new Date(), 1),
  //       },
  //     },
  //   }, {
  //     $group: {
  //       _id: '',
  //       "price": {
  //         $sum: '$price',
  //       },
  //     }
  //   }, {
  //     $project: {
  //       _id: 0,
  //       "TotalPrice": "$price"
  //     },
  //   }], (err, result) => {
  //     console.log('RESULT: ', result);
  //   });
  //   res.json({ data: 'success' });
  // });

  // Закуплено товарів за останній місяць
  // app.get('/api/analytics', (req, res) => {
  //   db.collection('cargos').aggregate([{
  //     $match: {
  //       created_at: {
  //         $gte: subMonths(new Date(), 1),
  //       },
  //     },
  //   }, {
  //     $group: {
  //       _id: '',
  //       "amount": {
  //         $sum: '$amount',
  //       },
  //     }
  //   }, {
  //     $project: {
  //       _id: 0,
  //       "TotalAmount": "$amount"
  //     },
  //   }], (err, result) => {
  //     console.log('RESULT: ', result);
  //   });
  //   res.json({ data: 'success' });
  // });

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
