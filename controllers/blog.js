const Blog = require('../models/Blog');

//create blog
const create = (blog) => {
    return Blog.create(blog);
    //call model

}
const getAll = () => Blog.find({}).exec();
//get All blogs related to logined user
const gets = (query) => Blog.find(query).exec();
const getById = (id) => Blog.findById(id).exec();
const deleteBlog = (id) => Blog.findOneAndRemove(id).exec();
const getByTitle = ({ title }) => Blog.find({ title }).exec();
const getByTags = ({ tags }) => Blog.find({ tags }).exec();
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
//get all blog related to follwed user
const getBlogFoll = (query) => Blog.find(query).exec();
//serch by Auther
const getByAuther = ({ autherId }) => Blog.find({ autherId }).exec();
//get newly blogs
const getNew = () => Blog.find().sort([['createdAT',-1]]).exec();

module.exports = {
    create,
    getAll,
    getById,
    editOne,
    gets,
    getByTitle,
    getByTags,
    deleteBlog,
    getBlogFoll,
    getByAuther,
    getNew,

}