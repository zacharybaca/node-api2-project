const express = require('express');

const router = express.Router();

const Posts = require('./db.js');

router.use(express.json());

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts'
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post Not Found'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error'
      });
    });
});
//Not Working
router.post(
  ('/',
  (req, res) => {
    Posts.insert(req.params.id)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error Adding Post'
        });
      });
  })
);

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post could not be found'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error updating post'
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'Post has been deleted' });
      } else {
        res.status(404).json({ message: 'Post could not be found' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error removing post'
      });
    });
});

router.get('/:id/posts/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'error'
      });
    });
});

router.get('/:id/comments', (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'error'
      });
    });
});

router.post('/comments', (req, res) => {
  const postId = req.params.id;
  Posts.insertComment(req.body)
    .then(id => {
      if (id) {
        res.status(200).json(id);
      } else {
        res.status(404).json({
          message: 'Does Not Exist'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: 'error'
      });
    });
});

module.exports = router;
