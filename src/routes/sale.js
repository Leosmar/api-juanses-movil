const { Router } = require("express");
const route = Router();
const sequelize = require("../model/connection");
const { QueryTypes, Op, where } = require("sequelize");
let UUID = require("uuid-random");

const Sale = require("../model/Sale");
const Phone = require("../model/Phone");
const OtherProduct = require("../model/OtherProduct");

//creating sale
route.post("/post-sale", async (req, res) => {
  try {
    let { products, clientId, paymentType } = req.body;
    let codeSale = UUID();

    await Promise.all(
      products.map(async (product) => {
        if (product?.imei1) {
          await Phone.update(
            {
              stock: false,
            },
            { where: { id: product.id } }
          );

          await Sale.create({
            totalValue: product.totalValue,
            phoneId: product.id,
            codeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant || 1,
          });
        } else {
          await OtherProduct.increment(
            {
              cant: -product.saleCant,
            },
            { where: { id: product.id } }
          );

          await Sale.create({
            totalValue: product.totalValue,
            otherproductId: product.id,
            codeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant,
          });
        }
      })
    );

    res.json({ error: "false", data: [] });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//get All sale
route.get("/get-sale", async (req, res) => {
  try {
    let AllData = [];

    const findDataWhitPhone = await sequelize.query(
      "SELECT sales.id, sales.totalValue, sales.paymentType, sales.saleCant, sales.createdAt, sales.phoneId, sales.otherproductId, sales.clientId, sales.codeSale, brands.brand, models.model, clients.name FROM sales inner join phones on sales.phoneId = phones.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id inner join clients on sales.clientId = clients.id where sales.otherproductId is null;",
      {
        type: QueryTypes.SELECT,
      }
    );

    const findDataWhitOtherproduct = await sequelize.query(
      "SELECT sales.id, sales.totalValue, sales.paymentType, sales.saleCant, sales.createdAt, sales.phoneId, sales.otherproductId, sales.clientId, sales.codeSale, otherproducts.name as otherproductName, otherproducts.categoryId, clients.name, categories.typeProduct FROM sales inner join otherproducts on sales.otherproductId = otherproducts.id inner join categories on otherproducts.categoryId = categories.id inner join clients on sales.clientId = clients.id where sales.phoneId is null;",
      {
        type: QueryTypes.SELECT,
      }
    );

    findDataWhitPhone.map((item) => {
      AllData.push(item);
    });

    findDataWhitOtherproduct.map((item) => {
      AllData.push(item);
    });

    AllData.map((item, i) => {
      let product = {};
      if (item.phoneId) {
        product.brand = item.brand;
        product.model = item.model;
      }

      if (item.otherproductId) {
        product.otherproductName = item.otherproductName;
        product.typeProduct = item.typeProduct;
      }

      AllData[i].product = product;
    });

    const groupData = AllData.reduce(
      (groupedCodeSale, item) => ({
        ...groupedCodeSale,
        [item.codeSale]: groupedCodeSale[item.codeSale]
          ? [...groupedCodeSale[item.codeSale], item]
          : [item],
      }),
      {}
    );

    let iterableData = Object.values(groupData);

    return res.json({
      error: "false",
      data: iterableData,
    });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//get all products for sale
route.get("/get-products-sale", async (req, res) => {
  const products = [];

  const getPhones = await sequelize.query(
    "SELECT phones.id, phones.color, phones.imei1, phones.imei2, phones.ram, phones.rom, phones.totalValue, phones.subjectValue, phones.stock, brands.brand, models.model FROM phones inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id;",
    {
      type: QueryTypes.SELECT,
    }
  );
  const getOtherProducts = await sequelize.query(
    "SELECT otherproducts.id, otherproducts.name, otherproducts.cant, otherproducts.totalValue, otherproducts.subjectValue, categories.typeProduct FROM otherproducts inner join categories on otherproducts.categoryId = categories.id",
    {
      type: QueryTypes.SELECT,
    }
  );

  products.push(...getPhones);
  products.push(...getOtherProducts);

  return res.json({ error: "false", data: products });
});

//update sale
route.post("/put-sale", async (req, res) => {
  try {
    let { products, clientId, paymentType, updateCodeSale } = req.body;
    console.log(products);

    const getProductsWhitCodeSale = await Sale.findAll({
      where: {
        codeSale: updateCodeSale,
      },
      attributes: ["id", "phoneId", "otherproductId"],
    });

    const productSave = [];

    getProductsWhitCodeSale.map((id) => {
      let phoneId = id?.phoneId;
      let otherproductId = id?.otherproductId;

      products.map((product) => {
        if (product?.brand) {
          if (phoneId === product.id) {
            productSave.push(id.id);
          }
        }

        if (product?.typeProduct) {
          if (otherproductId === product.id) {
            productSave.push(id.id);
          }
        }
      });
    });

    const getDataFromDeleteSale = await Sale.findAll({
      where: {
        id: {
          [Op.not]: productSave,
        },
        codeSale: updateCodeSale,
      },
    });

    await Promise.all(
      getDataFromDeleteSale.map(async (product) => {
        if (product.phoneId) {
          console.log(
            `El siguiente telefono sera modificado: ${product.phoneId} con stock true`
          );
          // await Phone.update(
          //   {
          //     stock: true,
          //   },
          //   {
          //     where: {
          //       id: product.phoneId,
          //     },
          //   }
          // );
        }
        if (product.otherproductId) {
          console.log(
            `El siguiente accesorio sera modificado: ${product.otherproductId} sumando +${product.saleCant}`
          );
          // await OtherProduct.increment(
          //   {
          //     cant: product.saleCant,
          //   },
          //   { where: { id: product.id } }
          // );
        }
      })
    );

    //verify if data have codeSale an sum or subs whit the comparation between obj.saleCant and database.saleCant

    //delete all data 
    // await Sale.destroy({
    //   where: {
    //     //   id: {
    //     //     [Op.not]: productSave,
    //     //   },
    //     codeSale: updateCodeSale,
    //   },
    // });

    res.json({ error: "false", data: "" });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//delete sale
route.delete("/delete-sale/:id", async (req, res) => {
  try {
    let { id } = req.params;

    await Sale.destroy({
      where: {
        codeSale: id,
      },
    });

    res.json({ error: "false", data: "" });
  } catch (err) {
    res.json({ error: true, err });
  }
});

module.exports = route;
