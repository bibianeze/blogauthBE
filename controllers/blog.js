const  Blog = require("../models/blog")




const createBlog = async (req, res)=>{
    // res.send("created")
    // console.log(req.user);
    const {userId} = req.user
    req.body.createdby = userId

    try {
        const blog = await Blog.create(req.body)
        res.status(201).json({success: true, blog})
    } catch (error) {
        res.json({error})
    }
    
}

const getBlogs = async (req, res)=>{
    const {userId} = req.user
    try {
        const blogs = await Blog.find({createdby: userId})
        res.status(200).json({success: true, blogs})
    } catch (error) {
        res.json({error})
    }
}

const getSingleBlog = async (req, res)=>{
    const {userId} = req.user
    const {blogId} = req.params
    try {
        const blog = await Blog.findOne({createdby: userId, _id: blogId})
        res.status(200).json({success:true, blog})
    } catch (error) {
        res.json({error})
    }
}

const updateBlog = async (req, res)=>{
    const {userId} = req.user
    const {blogId} = req.params

    try {
        const blog = await Blog.findByIdAndUpdate({createdby: userId, _id:blogId}, req.body, {new:true}, {runValidators: true})
        res.status(200).json({success:true, blog})
    } catch (error) {
        res.json({error})
    }
}

const deleteBlog = async (req, res)=>{
   const {userId} = req.user
   const {blogId} = req.params
   try {
    const blog = await Blog.findOneAndDelete({createdby:userId, _id:blogId})
    res.status(200).json({success: true, msg: "Blog deleted successfully"})
   } catch (error) {
    res.json({error})
   }
}

module.exports= {createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog}