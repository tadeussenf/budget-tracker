import express = require("express");
import jwt = require("jsonwebtoken");
import _ = require("lodash");
import request = require("request-promise");

class TestCtrl {

  routes(app: express.Application, baseRoute: string) {
    app.post(baseRoute + '/location', this.test);
  }

  test(req: express.Request, res: express.Response) {
    let apiKey = 'AIzaSyAtZF7qZvWE0AmbMXM_yaGIIInmfnh8WJE';

    request.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' +
      apiKey + '&radius=50&types=store&location=' +
      req.body.latitude + ',' +
      req.body.longitude)
      .then((result) => {

        res
          .status(200)
          .json(JSON.parse(result));
      });
  }
}

export default new TestCtrl();
