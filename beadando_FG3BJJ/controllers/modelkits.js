var express = require('express');

var router = express.Router();

//Viewmodel réteg
var statusTexts = {
    'new': 'Új',
    'inProgress': 'Elkezdett',
    'done': 'Kész',
};
var statusClasses = {
    'new': 'danger',
    'inProgress': 'info',
    'done': 'success',
};

function decoratemodelkits(modelkitContainer) {
    return modelkitContainer.map(function(e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

router.get('/list', function(req, res) {
    req.app.models.modelkit.find().then(function(modelkits) {
        console.log(modelkits);
        //megjelenítés
        res.render('model_kits/list', {
            modelkits: decoratemodelkits(modelkits),
            messages: req.flash('info')
        });
    });
});
router.get('/new', function(req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();

    res.render('model_kits/new', {
        validationErrors: validationErrors,
        data: data,
    });
});
router.post('/new', function(req, res) {
    // adatok ellenőrzése
    req.checkBody('gyarto', 'Hibás gyártó!').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('keszletNeve').escape();
    req.checkBody('keszletNeve', 'Hibás készletnév!').notEmpty().withMessage('Kötelező megadni!');

    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    console.log(req.body);

    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/model_kits/new');
    }
    else {
        // adatok elmentése és a hibalista megjelenítése
        req.app.models.modelkit.create({
                status: 'new',
                make: req.body.gyarto,
                kitname: req.body.keszletNeve
            })
            .then(function(modelkit) {
                //siker
                req.flash('info', 'Makettkészlet sikeresen hozzáadva!');
                res.redirect('/model_kits/list');
            })
            .catch(function(err) {
                //hiba
                console.log(err);
            });
    }
});
router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.modelkit.findOne({
            id: id
        })
        .then(function(modelkit) {
            res.render('model_kits/edit', {
                modelkit:modelkit
            });
        });
});
router.post('/edit/:id', function(req, res) {
     var id = req.params.id;
    req.app.models.modelkit.findOne({
            id: id
        })
        .then(function(modelkit){
            req.app.models.modelkit.update(modelkit, {
                make: req.body.gyarto,
                kitname: req.body.keszletNeve
            })
            .then(function(modelkit) {
                //siker
                req.flash('info', 'Makettkészlet szerkesztése sikeres!');
                res.redirect('/model_kits/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });
        });
});
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.modelkit.destroy({
            id: id
        })
        .then(function(deletedmodelkits) {
            res.format({
                'text/html': function() {
                    res.redirect('/model_kits/list');
                },
                'application/json': function() {
                    res.json({
                        success: true
                    });
                }
            });
        });
});
router.get('/started/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.modelkit.findOne({
            id: id
        })
        .then(function(modelkit){
            req.app.models.modelkit.update(modelkit, {
                status: 'inProgress',
            })
            .then(function(modelkit) {
                //siker
                req.flash('warning', 'Makettkészlet állapota megváltozott!');
                res.redirect('/model_kits/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });
        });
});
router.get('/done/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.modelkit.findOne({
            id: id
        })
        .then(function(modelkit){
            req.app.models.modelkit.update(modelkit, {
                status: 'done',
            })
            .then(function(modelkit) {
                //siker
                req.flash('warning', 'Makettkészlet állapota megváltozott!');
                res.redirect('/model_kits/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });
        });
});
module.exports = router;