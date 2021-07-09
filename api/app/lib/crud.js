const express = require('express');

module.exports = (Collection,
    params = { modelField: null, reqField: null }
) => {

    // ======
    // Create
    // ======
    const create = (req, res) => {
        let newEntry = req.body;
        if (params.reqField && params.modelField)
            newEntry = { ...newEntry, [params.modelField]: req[params.reqField] }
        Collection.create(newEntry, (e, newEntry) => {
            if (e) {
                console.log(e);
                //res.sendStatus(500);
                res.status(500).send({ message: e?.message })
            } else {
                res.send({ values: newEntry, message: "create successufly" });
            }
        });
    };

    // =========
    // Read many
    // =========
    const readMany = async (req, res) => {

        let query = res.locals.query || {};
        if (params.reqField && params.modelField)
            query = { ...query, [params.modelField]: req[params.reqField] }

        await Collection.find(query, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.send(result);
            }
        });
    };

    // ========
    // Read one
    // ========
    const readOne = (req, res) => {
        const { _id } = req.params;

        Collection.findById(_id, (e, result) => {
            if (e) {
                res.status(500).send(e);
                console.log(e.message);
            } else {
                res.send(result);
            }
        });
    };

    // ======
    // Update
    // ======
    const update = (req, res) => {
        let changedEntry = req.body;
        if (params.reqField && params.modelField)
            changedEntry = { ...changedEntry, [params.modelField]: req[params.reqField] }

        Collection.update({ _id: req.params._id }, { $set: changedEntry }, (e) => {
            if (e)
                res.sendStatus(500);
            else
                res.sendStatus(200);
        });
    };

    // ======
    // Remove
    // ======
    const remove = (req, res) => {
        let query = { _id: req.params._id }
        if (params.reqField && params.modelField)
            query = { ...query, [params.modelField]: req[params.reqField] }

        Collection.remove(query, (e) => {
            if (e)
                res.status(500).send(e);
            else
                res.sendStatus(200);
        });
    };

    // ======
    // Routes
    // ======

    let router = express.Router();

    router.post('/', create);
    router.get('/', readMany);
    router.get('/:_id', readOne);
    router.put('/:_id', update);
    router.delete('/:_id', remove);

    return router;

}