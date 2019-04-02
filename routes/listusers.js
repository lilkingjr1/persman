const express = require("express"), router = express.Router(), passport = require("passport"), User = require("../models/user");

router.get("/listusers", isLoggedIn, function(req, res){
    User.find({}, function(err, allUsers){
       if(err) {
          console.log(err);
       } else {
          res.render("listusers", {users: allUsers, priv: req.user.role});
       }
    })
 });
 
router.get("/listusers/edit/:id", isLoggedIn, function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            res.render("edit", {user: foundUser});
        }
    });
});

router.post("/listusers/edit", isLoggedIn, function(req,res){
    if(!req.user.role) return res.redirect("/");
    User.find({_id: req.body.id}, function(err, user){
        if(err) {
            console.log(err);
        } else {
            // if(req.body.name != user[0].username) {
            //     User.findOneAndUpdate({_id: req.body.id}, {$set:{username:req.body.name}}, function(err,doc){
            //         if(err) {
            //             console.log(err);
            //         }
            //     });
            // }
            if(req.body.rank != user[0].rank) {
                User.findOneAndUpdate({_id: req.body.id}, {$set:{rank:req.body.rank}}, function(err,doc){
                    if(err) {
                        console.log(err);
                    }
                });
            }
            if(req.body.status != user[0].status) {
                User.findOneAndUpdate({_id: req.body.id}, {$set:{status:req.body.status}}, function(err,doc){
                    if(err) {
                        console.log(err);
                    }
                });
            }
            if(req.body.position != user[0].position) {
                User.findOneAndUpdate({_id: req.body.id}, {$set:{position:req.body.position}}, function(err,doc){
                    if(err) {
                        console.log(err);
                    }
                });
            }
            var newUnit = {company: req.body.company, platoon: req.body.platoon, squad: req.body.squad};
            console.log(newUnit);
            User.findOneAndUpdate({_id: req.body.id}, {$set:{unit:newUnit}}, function(err,doc){
                if(err) {
                    console.log(err);
                }
            });
        }
    });
    res.redirect("/listusers");
});

 router.post("/listusers/delete/:id", isLoggedIn, (req, res) => {
     if(!req.user.role) return res.redirect("/");
     User.findByIdAndDelete(req.params.id, err => {
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/listusers");
        }
     });
 })


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

 module.exports = router;