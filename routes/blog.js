const express = require('express');
const { create, getAll, getById, editOne, gets, getByTitle, getByTags, deleteBlog, getBlogFoll,getByAuther,getNew } = require('../controllers/blog');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
//imgurl
const multer=require('multer');
const path=require('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'static/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//get all blogs
router.get('/', async (req, res, next) => {

    try {
        const blog = await getAll();
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
//creat blog by logind user
router.use(authMiddleware);
// router.post('/', async (req, res, next) => {
//     const { body, user: { id } } = req;
//     console.log(id);
//     try {
//         const blog = await create({ ...body, autherId: id });
//         res.json(blog);
//     } catch (e) {
//         next(e);
//     }
// });
router.post('/',async (req, res, next) => {
    console.log(req.user);
const upload = multer({ storage: storage }).single("imgurl");

    upload(req,res,  function(err){
        console.log(req.user);
        const { body, user:{id} } = req;
        if(req.file!=undefined)
        body.imgurl= req.file.path;
    
        create({ ...body, autherId: id }).then(blog=>res.json(blog)).catch(e=>next(e));
    
    });
    
});
//get newly blogs
router.get('/new', async (req, res, next) => {

    try {
        const blog = await getNew();
        res.json(blog);

    } catch (e) {
        next(e);

    }
});

//get all blog related to logined user(profile)
router.get('/owned', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const blog = await gets({ autherId: id });
        res.json(blog);

    } catch (e) {
        next(e);

    }
});

//get blog by id
router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blog = await getById(id);
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
//edit
router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const blog = await editOne(id, body);
        res.json(blog);

    } catch (e) {
        next(e);

    }
});

//search by title
router.get('/title/:title', async (req, res, next) => {
    const { params: { title } } = req;
    try {
        const blogs = await getByTitle({ title });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//search by tags
router.get('/tags/:tags', async (req, res, next) => {
    const { params: { tags } } = req;
    try {
        const blogs = await getByTags({ tags });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//delete by id
router.delete('/deletes/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blog = await deleteBlog(id);
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
//get all blog related to follwed user
router.get('/blogfollow/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blog = await getBlogFoll({ autherId: id });
        res.json(blog);

    } catch (e) {
        next(e);

    }
});

//get all blog related to follwed user
router.get('/blogauther/:autherId', async (req, res, next) => {
    const { params: { autherId } } = req;
    try {
        const blog = await gets({ autherId });
        res.json(blog);

    } catch (e) {
        next(e);

    }
});
//search by Auther Id
router.get('/auther/:autherId', async (req, res, next) => {
    const { params: { autherId } } = req;
    try {
        const blogs = await getByAuther({ autherId });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});




module.exports = router;