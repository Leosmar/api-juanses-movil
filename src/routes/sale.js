const { Router } = require("express");
const route = Router();
const sequelize = require("../model/connection");
const { QueryTypes, Op, where } = require("sequelize");
let UUID = require("uuid-random");

const Sale = require("../model/Sale");
const ReturnSale = require("../model/ReturnSale");
const Phone = require("../model/Phone");
const OtherProduct = require("../model/OtherProduct");
const CashRegister = require("../model/CashRegister");

//creating sale
route.post("/post-sale", async (req, res) => {
  try {
    let { products, clientId, paymentType } = req.body;
    let codeSale = UUID();
    let sumSaleValue = 0;

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
            totalValue: product.value,
            phoneId: product.id,
            codeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant || 1,
          });
          sumSaleValue += product.value;
        } else {
          await OtherProduct.increment(
            {
              cant: -product.saleCant,
            },
            { where: { id: product.id } }
          );

          await Sale.create({
            totalValue: product.value,
            otherproductId: product.id,
            codeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant,
          });

          sumSaleValue = sumSaleValue + product.value * product.saleCant;
        }
      })
    );

    await CashRegister.increment(
      {
        total: sumSaleValue,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    res.json({ error: "false", data: [] });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//get All sale
route.get("/get-cancel-sale", async (req, res) => {
  try {
    let AllData = [];

    const findDataWhitPhone = await sequelize.query(
      "SELECT phones.imei1, returnsales.id, returnsales.totalValue, returnsales.paymentType, returnsales.saleCant, returnsales.createdAt, returnsales.phoneId, returnsales.otherproductId, returnsales.clientId, returnsales.codeSale, brands.brand, models.model, clients.name FROM returnsales inner join phones on returnsales.phoneId = phones.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id inner join clients on returnsales.clientId = clients.id where returnsales.otherproductId is null;",
      {
        type: QueryTypes.SELECT,
      }
    );

    const findDataWhitOtherproduct = await sequelize.query(
      "SELECT returnsales.id, returnsales.totalValue, returnsales.paymentType, returnsales.saleCant, returnsales.createdAt, returnsales.phoneId, returnsales.otherproductId, returnsales.clientId, returnsales.codeSale, otherproducts.name as otherproductName, otherproducts.categoryId, clients.name, categories.typeProduct FROM returnsales inner join otherproducts on returnsales.otherproductId = otherproducts.id inner join categories on otherproducts.categoryId = categories.id inner join clients on returnsales.clientId = clients.id where returnsales.phoneId is null;",
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
        product.imei1 = item.imei1;
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

//get All cancel sale
route.get("/get-sale", async (req, res) => {
  try {
    let AllData = [];

    const findDataWhitPhone = await sequelize.query(
      "SELECT phones.imei1, sales.id, sales.totalValue, sales.paymentType, sales.saleCant, sales.createdAt, sales.phoneId, sales.otherproductId, sales.clientId, sales.codeSale, brands.brand, models.model, clients.name FROM sales inner join phones on sales.phoneId = phones.id inner join brands on phones.brandId = brands.id inner join models on phones.modelId = models.id inner join clients on sales.clientId = clients.id where sales.otherproductId is null;",
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
        product.imei1 = item.imei1;
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
    //Pendiente arreglar que cuando se cambie el precio de un producto se guarde bien en la caja
    let { products, clientId, paymentType, updateCodeSale } = req.body;
    const productSave = [];
    const otherproductToIgnore = [];
    let updateCashRegister = 0;

    const getProductsWhitCodeSale = await Sale.findAll({
      where: {
        codeSale: updateCodeSale,
      },
      attributes: ["id", "phoneId", "otherproductId"],
    });

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
          updateCashRegister = updateCashRegister - product.totalValue;
          await Phone.update(
            {
              stock: true,
            },
            {
              where: {
                id: product.phoneId,
              },
            }
          );
        }

        if (product.otherproductId) {
          updateCashRegister =
            updateCashRegister - product.totalValue * product.saleCant;

          await OtherProduct.increment(
            {
              cant: product.saleCant,
            },
            { where: { id: product.otherproductId } }
          );
        }
      })
    );

    await Promise.all(
      products.map(async (product) => {
        if (product?.typeProduct) {
          const productSaveInDDBB = await Sale.findOne({
            where: {
              otherproductId: product.id,
              codeSale: updateCodeSale,
            },
            attributes: ["saleCant", "totalValue"],
          });

          if (!productSaveInDDBB) return;

          otherproductToIgnore.push(product.id);

          let saleCantSaveInDDBB = productSaveInDDBB?.dataValues?.saleCant;
          let updateCant = saleCantSaveInDDBB - product.saleCant;

          if (product.saleCant < saleCantSaveInDDBB) {
            updateCashRegister =
              updateCashRegister - product.value * updateCant;

            await OtherProduct.increment(
              {
                cant: updateCant,
              },
              { where: { id: product.id } }
            );
          } else if (product.saleCant > saleCantSaveInDDBB) {
            updateCashRegister =
              updateCashRegister + product.value * (updateCant * -1);

            await OtherProduct.increment(
              {
                cant: updateCant,
              },
              { where: { id: product.id } }
            );
          }
        }
      })
    );

    await Sale.destroy({
      where: {
        codeSale: updateCodeSale,
      },
    });

    await Promise.all(
      products.map(async (product) => {
        if (product?.imei1) {
          await Phone.update(
            {
              stock: false,
            },
            { where: { id: product.id } }
          );

          updateCashRegister = updateCashRegister + product.value * 1;

          await Sale.create({
            totalValue: product.value,
            phoneId: product.id,
            codeSale: updateCodeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant || 1,
          });
        } else {
          if (!otherproductToIgnore.includes(product.id)) {
            updateCashRegister =
              updateCashRegister + product.value * product.saleCant;
            await OtherProduct.increment(
              {
                cant: -product.saleCant,
              },
              { where: { id: product.id } }
            );
          }

          await Sale.create({
            totalValue: product.value,
            otherproductId: product.id,
            codeSale: updateCodeSale,
            paymentType: paymentType,
            clientId: clientId,
            saleCant: product.saleCant,
          });
        }
      })
    );

    await CashRegister.increment(
      {
        total: updateCashRegister,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    res.json({ error: "false", data: "" });
  } catch (err) {
    res.json({ error: true, err });
  }
});

//return sale
route.delete("/return-sale/:id", async (req, res) => {
  try {
    let { id } = req.params;

    const products = await Sale.findAll({
      where: {
        codeSale: id,
      },
    });

    const subtract = products.reduce(
      (acc, currenVale) => acc + currenVale.totalValue * currenVale.saleCant,
      0
    );

    await Promise.all(
      products.map(async (product) => {
        if (product?.phoneId) {
          await Phone.update(
            {
              stock: true,
            },
            { where: { id: product.phoneId } }
          );
          await ReturnSale.create({
            totalValue: product.totalValue,
            phoneId: product.phoneId,
            codeSale: product.codeSale,
            paymentType: product.paymentType,
            clientId: product.clientId,
            saleCant: product.saleCant || 1,
          });
        }

        if (product?.otherproductId) {
          await OtherProduct.increment(
            {
              cant: product.saleCant,
            },
            { where: { id: product.otherproductId } }
          );

          await ReturnSale.create({
            totalValue: product.totalValue,
            otherproductId: product.otherproductId,
            codeSale: product.codeSale,
            paymentType: product.paymentType,
            clientId: product.clientId,
            saleCant: product.saleCant,
          });
        }
      })
    );

    await CashRegister.increment(
      {
        total: -subtract,
      },
      {
        where: {
          id: 1,
        },
      }
    );

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
