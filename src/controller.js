/**
 * @author: ntwari egide
 * @description: end point controller
 */

const { context } = require("@opentelemetry/api");
const { default: axios } = require("axios");
const { startSpan, endSpan } = require("../trace/span");
const router = require("express").Router();
const app = require("express");
const clientRouter = require('./routes/client.routes')
const brandRoutes = require('./routes/brand.routes')
const contentNumberRoutes = require('./routes/content-number.routes')
const ordersRoutes = require('./routes/orders.routes')
const translationRoutes = require('./routes/translation.routes')
const itemsRoutes = require('./routes/item.routes')
const menuRoutes = require('./routes/menu.routes')     
const userRoutes = require('./routes/user.routes')
const sizeTableRoutes = require('./routes/sizetable.routes')

const path = require('path')




const getApi = (url) => {
  return axios.get(url);
}

const async = require("async");

router.get("/order", async (req, res) => {
  const resultData = await getApi("http://localhost:9998/items");
  const resultData2 = await getApi("http://localhost:9999/customers");

  // console.log(" reached here ....",resultData);
  // console.log(" reached here2 ....",resultData2);

  const data = {
    d1: JSON.stringify(resultData.data),
    d2: JSON.stringify(resultData2.data),
  };

  res.status(200).send(data);
});

/**
 * apis to be implemented
*/
router.use("/api/Order", ordersRoutes)

router.use("/api/Client", clientRouter)

router.use('/api/Contentnumber', contentNumberRoutes )

router.use('/api/Translation', translationRoutes)

router.use('/api/brand', brandRoutes)

router.use('/api/Item', itemsRoutes)

router.use('/api/user', userRoutes)

router.use('/api/SizeTable', sizeTableRoutes)


//  https://portaldev.1-label.com/api/Menu/GetMenuList

router.use('/api/Menu', menuRoutes )

router.route("/sorder", async (req, res) => {
  async.parallel(
    {
      task1: async (callback) => {
        let result = await getApi("http://localhost:9998/items") 
        callback(null, result);
      },
      task2: async (callback) => {
        let result = await getApi("http://localhost:9999/customers")
        callback(null, result);
      },
    },
    (err, result) => {
      //console.log(result);
      let d = {
        d1: JSON.stringify(result.task1.data),
        d2: JSON.stringify(result.task2.data),
      };
      res.status(200).send(d);
    }
  );
});

module.exports = router;
