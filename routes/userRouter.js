/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
var express = require('express'),
    router = express.Router(),
	 utils = require('./utils'),
    User = require('../config/db').userModel;

router.use(utils.isAuthenticated);

router.get('/dashboard', function(req, res, next) {
    var email = req.email;
    if(email) {
        User.getDashboard(email, function(data){
            res.json(data);
        });
    } else
        res.json({});
});

router.get('/:id', function(req, res, next) {
    var email = req.params.id;
    if(email) {
        User.getUser(email, function(user){
            res.json(user);
        });
    } else
        res.json({});
});

router.post('/savetab', function(req, res, next) {
  User.saveTab(req.user._id, req.body.tabs);
  res.send({resp:"Tabs updated successfully"});
});

module.exports = router;
