const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const User = mongoose.model("User");
const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith("image/");
        if (isPhoto) {
            next(null, true);
        } else {
            next({
                message: "That filetype isn't allowed!"
            }, false);
        }
    }
};

exports.homePage = (req, res) => {
    res.render("index");
};

exports.addStore = (req, res) => {
    res.render("editStore", {
        title: "Add Store"
    });
};


exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // Check if there is no new file to resize
    if (!req.file) {
        next(); // Skip to the next middleware
        return; // Stop the function from running!
    }
    const extension = req.file.mimetype.split("/")[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    // Now we resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    // Once we have written the photo in to our filesystem, keep going!
    next();
};

exports.createStore = async (req, res) => {
    req.body.author = req.user._id;
    const store = new Store(req.body);
    await store.save();
    req.flash("success", `Successfully created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // 1. Query the database for a list of all stores!
    const stores = await Store.find();
    res.render("stores", {
        title: "Stores",
        stores
    });
};

const confirmOwner = (store, user) => {
    if (!store.author.equals(user._id)) {
        throw Error("You must own a store in order to edit it!");
    }
};

exports.editStore = async (req, res) => {
    // 1. Find the store given the ID
    const store = await Store.findOne({
        _id: req.params.id
    });
    // 2. Confirm they are the owner of the store
    confirmOwner(store, req.user);
    // 3. Render out the edit form so the user can update the store
    res.render("editStore", {
        title: `Edit ${store.name}`,
        store
    });
};

exports.updateStore = async (req, res) => {
    // Set the location data to be Point:
    req.body.location.type = "Point";
    // 1. Find and update the store
    const store = await Store.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true
    }).exec();
    // 2. Redirect them to the store & tell them it worked!
    req.flash("success", `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
    res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
    const store = await Store.findOne({
        slug: req.params.slug
    }).populate("author");
    if (!store) return next(); // This will show 404
    res.render("store", {
        store,
        title: store.name
    });
}

exports.getStoresByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || {
        $exists: true
    };
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({
        tags: tagQuery
    });
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    res.render("tags", {
        title: "Tags",
        tags,
        stores,
        tag
    });
};

exports.searchStores = async (req, res) => {
    const stores = await Store
        // First find stores that match
        .find({
            $text: {
                $search: req.query.q,
            }
        }, {
            score: {
                $meta: "textScore"
            }
        })
        // Then sort them
        .sort({
            score: {
                $meta: "textScore"
            }
        })
        // Limit to only 5 results
        .limit(5);
    res.json(stores);
};

exports.mapStores = async (req, res) => {
    const coordinates = [req.query.lng, req.query.lat].map(parseFloat);

    const q = {
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates
                },
                $maxDistance: 10000 // 10KM
            }
        }
    };

    const stores =
        await Store
        .find(q)
        .select("name description slug location photo")
        .limit(10);
    res.json(stores);
};

exports.mapPage = (req, res) => {
    res.render("map", {
        title: "Map"
    });
};

exports.heartStore = async (req, res) => {
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? "$pull" : "$addToSet";
    const user = await User.findByIdAndUpdate(req.user._id, {
        [operator]: {
            hearts: req.params.id
        },
    }, {
        new: true
    });
    res.json(user);
};

exports.getHearts = async (req, res) => {
    const stores = await Store.find({
        _id: {
            $in: req.user.hearts
        }
    });
    res.render("stores", {
        title: "Hearted Stores",
        stores
    });
};