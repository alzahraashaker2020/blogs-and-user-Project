const express = require('express');
const {
    create, login, getAll, editone, follow, unfollow, followes, unfollowes, removeAcc }
    = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
//register function
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//login function

router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }

});
//get All users
router.use(authMiddleware);
router.get('/', async (req, res, next) => {
    const { body } = req;
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }

});
//edit function
router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const user = await editone(id, body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//follow function
router.post('/follow/:fid', async (req, res, next) => {
    const { params: { fid }, user: { id } } = req;
    try {

        const userfollowID = await follow(id, fid);
        const userfollowIDes = await followes(id, fid);
        res.json({ userfollowID, userfollowIDes });
    } catch (e) {
        next(e);
    }
});
//unFollowes
router.post('/unfollow/:fid', async (req, res, next) => {
    const { params: { fid }, user: { id } } = req;
    try {

        const userunfollowID = await unfollow(id, fid);
        const userunfollowIDes = await unfollowes(id, fid);
        res.json({ userunfollowID, userunfollowIDes });
    } catch (e) {
        next(e);
    }
});
//delete
router.delete('/remove', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const users = await removeAcc(id);
        res.send("Delete done ");
    } catch (e) {
        next(e);
    }
});



module.exports = router;