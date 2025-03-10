const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json());
const { Op } = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/CakeShop.sqlite",
  });

const Cake = sequelize.define("Cake", {
    cake_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cake_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cake_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cake_size: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cake_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cake_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    store_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

const Customer = sequelize.define("Customer", {
    customer_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customer_password: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

const Employee = sequelize.define("Employee", {
    employee_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employee_password: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

const Order_Detail = sequelize.define("Order_Detail", {
    order_detail_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cake_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    store_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  const Store = sequelize.define("Store", {
    store_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    store_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    store_address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  });

sequelize.sync();

//---------------------------Table_Cake---------------------------------
app.get("/Cake", (req, res) => {
  Cake.findAll()
    .then((Cake) => {
      res.json(Cake);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        res.json(Cake);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/Cakes", (req, res) => {
  Cake.create(req.body)
    .then((Cake) => {
      res.send(Cake);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        Cake.update(req.body)
          .then(() => {
            res.send(Cake);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete("/Cake/:id", (req, res) => {
  Cake.findByPk(req.params.id)
    .then((Cake) => {
      if (!Cake) {
        res.status(404).send("Cake not found");
      } else {
        Cake.destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//---------------------------Table_Customer---------------------------------
app.get("/Customer", (req, res) => {
    Customer.findAll()
      .then((Customer) => {
        res.json(Customer);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

app.get("/Customer/:id", (req, res) => {
  Customer.findByPk(req.params.id)
    .then((Customer) => {
      if (!Customer) {
        res.status(404).send("Customer not found");
      } else {
        res.json(Customer);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/Customers", (req, res) => {
    Customer.create(req.body)
      .then((Customer) => {
        res.send(Customer);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.put("/Customer/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((Customer) => {
        if (!Customer) {
          res.status(404).send("Customer not found");
        } else {
            Customer.update(req.body)
            .then(() => {
              res.send(Customer);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.delete("/Customer/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((Customer) => {
        if (!Customer) {
          res.status(404).send("Customer not found");
        } else {
            Customer.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

//---------------------------Table_Employee---------------------------------
app.get("/Employee", (req, res) => {
    Employee.findAll()
      .then((Employee) => {
        res.json(Employee);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          res.status(404).send("Employee not found");
        } else {
          res.json(Employee);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Employees", (req, res) => {
    Employee.create(req.body)
      .then((Employee) => {
        res.send(Employee);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Employee/:id", (req, res) => {
  Employee.findByPk(req.params.id)
    .then((Employee) => {
      if (!Employee) {
        res.status(404).send("Employee not found");
      } else {
          Employee.update(req.body)
          .then(() => {
            res.send(Employee);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.delete("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
      .then((Employee) => {
        if (!Employee) {
          res.status(404).send("Employee not found");
        } else {
            Employee.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

//---------------------------Table_Store---------------------------------
app.get("/Store", (req, res) => {
  Store.findAll()
      .then((Store) => {
        res.json(Store);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Store/:id", (req, res) => {
    Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          res.json(Store);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Stores", (req, res) => {
    Store.create(req.body)
      .then((Store) => {
        res.send(Store);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Store/:id", (req, res) => {
    Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          Store.update(req.body)
            .then(() => {
              res.send(Store);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.delete("/Store/:id", (req, res) => {
  Store.findByPk(req.params.id)
      .then((Store) => {
        if (!Store) {
          res.status(404).send("Store not found");
        } else {
          Store.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

//---------------------------Table_Order_detail---------------------------------

app.get("/Order_Detail", (req, res) => {
    Order_Detail.findAll()
      .then((Order_Detail) => {
        res.json(Order_Detail);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.get("/Order_detail/:id", (req, res) => {
  Order_Detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
          res.json(Order_detail);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.post("/Order_details", (req, res) => {
  Order_Detail.create(req.body)
      .then((Order_detail) => {
        res.send(Order_detail);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.put("/Order_detail/:id", (req, res) => {
  Order_Detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
            Order_detail.update(req.body)
            .then(() => {
              res.send(Order_detail);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});

app.delete("/Order_detail/:id", (req, res) => {
  Order_Detail.findByPk(req.params.id)
      .then((Order_detail) => {
        if (!Order_detail) {
          res.status(404).send("Order_detail not found");
        } else {
            Order_detail.destroy()
            .then(() => {
              res.send({});
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});
//---------------------------connect Front---------------------------------

// Register
app.get("/register", (req, res) => {
  Customer.findAll() //select * from
    .then((Register) => {
      res.json(Register);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);

    const existingUsername = await Customer.findOne({where: { customer_username: req.body.customer_username },});
    const existingEmail = await Customer.findOne({where: { email: req.body.email },});

    if (existingUsername) return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว!" });
    if (existingEmail)  return res.status(400).json({ message: "อีเมล์นี้ถูกใช้ไปแล้ว!" });

    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ where: { customer_username: username } });
    const employee = await Employee.findOne({ where: { employee_username: username } });

    let isPasswordValid = false;
    let user = null;

    if (customer) {
      isPasswordValid = customer.customer_password == String(password);
      let pass = isPasswordValid ? customer.customer_password : null;
      user = {
        role: "customer",
        username: customer.customer_username,
        password: pass
      };
    } else if (employee) {
      isPasswordValid = employee.employee_password == String(password);
      let pass = isPasswordValid ? employee.employee_password : null;
      user = {
        role: "employee",
        username: employee.employee_username,
        password: pass
      };
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});


//menu_customer
app.get("/menu_customer", async (req, res) => {
  try {
    const cakes = await Cake.findAll();
    return res.render("menu_customer", { cakes });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/menu_customer", async (req, res) => {
  try {
    const { qty, cake_name, cake_price, userSession } = req.body;
    const cake = await Cake.findOne({ where: { cake_name: cake_name } });
    const customer = await Customer.findOne({ where: { customer_username: userSession } });
    const employee = await Employee.findOne({ where: { employee_username: userSession } });

    console.log(customer);
    let orderData = {
      cake_id: parseInt(cake.cake_id),
      employee_id: employee ? parseInt(employee.employee_id) : null,
      customer_id: customer ? parseInt(customer.customer_id) : null,
      store_id: parseInt(cake.store_id),
      Quantity: parseInt(qty),
      total_price: parseInt(qty) * parseFloat(cake.cake_price)
    };

    await Order_Detail.create(orderData);
    await Cake.update(
      { cake_quantity: cake.cake_quantity - qty },
      { where: { cake_id: cake.cake_id } }
    );
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error put");
  }
});

//add_menu
app.post("/add_menu", async (req, res) => {
  try {
    await Cake.create(req.body);
    return res.status(201).json({ message: "cake successfully" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error put");
  }
});

//jointable_orderdetails
app.get("/jointable_orderdetails", async (req, res) => {
  try {
    Order_Detail.belongsTo(Customer, { foreignKey: 'customer_id' });
    Order_Detail.belongsTo(Employee, { foreignKey: 'employee_id' });
    Order_Detail.belongsTo(Cake, { foreignKey: 'cake_id' });
    const orders = await Order_Detail.findAll({
      include: [{model: Customer, attributes: ['customer_id', 'Address']},
        {model: Employee, attributes: ['employee_username'], required: false},
        {model: Cake, attributes: ['cake_name', 'cake_status', 'cake_price']}], 
      where: { employee_id: null }
    });
    const reports = await Order_Detail.findAll({
      include: [{model: Customer, attributes: ['customer_id', 'Address', 'customer_username']},
        {model: Employee, attributes: ['employee_username'], required: false,},
        {model: Cake, attributes: ['cake_name', 'cake_status']}],
      where: { employee_id: { [Op.ne]: null } }
    });
    return res.json({ orders, reports });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error jointable_orderdetails");
  }
});

//add_employee_INOrder
app.post("/add_employee_INOrder/:id", async (req, res) => {
  try {
    const {test, userSession} = req.body;
    const employee = await Employee.findOne({ where: { employee_username: userSession } });

    if (employee) {
      await Order_Detail.update(
        { employee_id: employee.employee_id },
        { where: { order_detail_id: req.params.id } }
      );

      return res.status(201).json({ message: "Order updated successfully" });
    } else {
      return res.status(404).json({ error: "Employee not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error add_employee_INOrder");
  }
});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Example app listening at http://localhost:${port}`));