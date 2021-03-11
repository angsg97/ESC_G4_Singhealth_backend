//create a controller for a certain route given a model and a query type
const Controller = function (model, queryType) {
  //bind the model and query type to this object
  this.model = model;
  this.queryType = queryType;

  //return a callback function that can be called to execute the given query
  return (req, res) => {
    model.query(this.queryType, req, (err, data) => {
      //errors
      if (err) {
        //grab the model name
        let modelName = this.model.name;

        //handle errors
        switch (err.kind) {
          //id not found error
          case "id_not_found":
            res.status(404).send({
              message: `${modelName}_id ${
                req.params[modelName + "_id"]
              } not found`,
            });
            break;

          case "not_found":
            res.status(404).send({
              message: `request with params not found`,
              ...err.type,
            });
            break;

          //incomplete body error
          case "incomplete_body":
            res.status(403).send({
              message: `incomplete body. missing ${err.missing}`,
            });
            break;

          //misc errors
          default:
            res.status(500).send({
              message: `error on ${modelName} ${this.queryType}: ${err.message}`,
            });
        }
      }

      //no errors
      else {
        res.send(data);
      }
    });
  };
};

module.exports = Controller;
