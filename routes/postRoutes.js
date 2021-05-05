const express = require( 'express');
import Post from  '../models/postModel.js'

const router = express.Router();

// router.route('/').get((req, res) => {
  
//     Post.find()
//         .then(posts => res.json({ posts: posts}))
//         .catch(err => res.status(400).json(err));
// });

router.route('/add').post((req, res) => {
    const {title, creator, writeUp, medium, file} = req.body;
    const date = new Date();
    const newPost = new Post({title, creator, writeUp, medium, file});
    newPost.save()
        .then(() => res.json('Post added'))
        .catch(err => res.status(400).json(err));
});

router.route('/delete/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json(err));
});

router.route('/edit/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.creator = req.body.creator;
            post.writeUp = req.body.writeUp;
            post.medium = req.body.medium;
            post.file = req.body.file;
            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});





export default router;