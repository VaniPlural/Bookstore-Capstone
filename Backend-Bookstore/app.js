const { sequelize, books ,authors,genres} = require('./models');
const express = require('express');
const path = require('path'); 
const fs = require('fs'); 
const multer = require('multer');
const upload = multer({dest: 'Book-Images/'});
const upload_author = multer({dest: 'Author-Images/'});
const cors = require('cors'); // Add this line

const app = express();

books.belongsTo(authors, {foreignKey : 'author_id'});
books.belongsTo(genres, {foreignKey: 'genre_id'});

// Enable CORS for all origins during development
app.use(cors());

app.use(express.json());
app.use('/Book-Images', express.static(path.join(__dirname, 'Book-Images')));

//book POST

app.post('/book', upload.single('image'), async(req, res) => {
   // const {title, price, publication_date} = req.body;
   const {title, price, publication_date, author_id, genre_id} = req.body;
    const imageFile = req.file;
    let imageUrl = "";

    try{
        if (!imageFile) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        // unique filename 
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9);

        const oldPath = path.join(__dirname, imageFile.path);
        const newPath = path.join(__dirname, 'Book-Images', uniqueFilename + path.extname(imageFile.originalname));
        imageUrl = '/Book-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'

        fs.rename(oldPath, newPath, err => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to move uploaded file' });
            return;
        }

        imageUrl = '/Book-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'

        // Respond with success message 
        //res.json({ message: 'Image uploaded successfully', imageUrl });
       });
    //    include: [{
    //     model: authors,
    //     attributes: ['name']
    // }]


        //const book = await books.create({title, price, publication_date, imageUrl});
        const book = await books.create({title, price, publication_date, imageUrl, author_id, genre_id});
        return res.json(book);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
    
});

//book GET

app.get('/books', async(req, res) => {
    try {
        const books_list = await books.findAll({
            //attributes: ['title', 'price', 'publication_date','imageUrl'],
        include: [{
            model: authors,
            attributes: ['author_id','name']
        },{
            model:genres,
            attributes: ['genre_id','genre_name']
        }
    ]});
        
        res.json(books_list);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});

//book GET one

app.get('/book/:id', async(req, res) => {
    const book_id = req.params.id;
    try {
        const book = await books.findOne({
            where: { book_id },
            //attributes: ['title', 'price', 'publication_date','imageUrl'],
            include: [{
                model: authors,
                attributes: ['author_id','name']
            },{
                model:genres,
                attributes: ['genre_id','genre_name']
            }
        ]
          /* include: [{
            model:authors,

           }]*/
        });
        res.json(book);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});

//book PUT

app.put("/book/:id", upload.single("image"), async (req, res) => {
    const book_id = req.params.id;
    const { title, price, publication_date, author_id, genre_id } = req.body;
    const imageFile = req.file;
    let imageUrl;
    try {
      if (imageFile) {
        // unique filename
        const uniqueFilename = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const oldPath = path.join(__dirname, imageFile.path);
        const newPath = path.join(
          __dirname,
          "Book-Images",
          uniqueFilename + path.extname(imageFile.originalname)
        );
        imageUrl = "/Book-Images/" + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to move uploaded file" });
            return;
          }
          imageUrl = "/Book-Images/" + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
          // Respond with success message
          //res.json({ message: 'Image uploaded successfully', imageUrl });
        });
      }
    } catch (err) {}
    try {
      const book = await books.findOne({
        where: { book_id },
      });
      if (title) {
        book.title = title;
      }
      if (price) {
        book.price = price;
      }
      if (publication_date) {
        book.publication_date = publication_date;
      }
      if (author_id) {
        book.author_id = author_id;
      }
      if (genre_id) {
        book.genre_id = genre_id;
      }
      if (imageUrl) {
        book.imageUrl = imageUrl;
      }
      await book.save();
      return res.json(book);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });

/*app.put('/book/:id',upload_author.single('image'), async(req,res)=>{
    const book_id = req.params.id;
    const {title,price,publication_date, }=req.body;
    const imageFile = req.file;
    let imageUrl;
    try{
        if(imageFile){
        // unique filename
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const oldPath = path.join(__dirname, imageFile.path);
        const newPath = path.join(__dirname, 'Book-Images', uniqueFilename + path.extname(imageFile.originalname));
        imageUrl = '/Book-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
        fs.rename(oldPath, newPath, err => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to move uploaded file' });
            return;
        }
        imageUrl = '/Book-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
        // Respond with success message
        //res.json({ message: 'Image uploaded successfully', imageUrl });
    });
}
}catch(err){
    }
    try{
        const book = await books.findOne({
            where: { book_id },
            attributes: ['title', 'price', 'publication_date','imageUrl'],
            include: [{
                model: authors,
                attributes: ['name']
            },{
                model:genres,
                attributes: ['genre_name']
            }
            ]
        });
            if(title){
            book.title=title;}
            if(price){
            book.price=price;}
            if(publication_date){
            book.publication_date=publication_date;}
            if(imageUrl){
                book.imageUrl = imageUrl;
            }
            await book.save();
        return res.json(book) ;
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});
*/
//book DELETE

app.delete('/book/:id', async(req, res) => {
    const book_id = req.params.id;
    try {
        const book = await books.findOne({
            where: { book_id }});
            await book.destroy();
            return res.json({message:'Book Deleted!'});
        }
       // res.json(book);
    
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}); 

/*---------AUTHORS-------------*/
//authors GET

app.get('/authors', async(req, res) => {
    try {
        const authors_list = await authors.findAll();
        res.json(authors_list);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});


//author GET one

app.get('/author/:id', async(req, res) => {
    const author_id = req.params.id;
    try {
        const author = await authors.findOne({
            where: { author_id },
        });
        res.json(author);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});


//authors POST

app.post('/author', upload_author.single('image'), async(req, res) => {
    const {name, biography} = req.body;
    const imageFile = req.file;
    let imageUrl = "";

    try{
        if (!imageFile) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        // unique filename 
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9);

        const oldPath = path.join(__dirname, imageFile.path);
        const newPath = path.join(__dirname, 'Author-Images', uniqueFilename + path.extname(imageFile.originalname));
        imageUrl = '/Author-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'

        fs.rename(oldPath, newPath, err => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to move uploaded file' });
            return;
        }

        imageUrl = '/Author-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'

        // Respond with success message 
        //res.json({ message: 'Image uploaded successfully', imageUrl });
       });



        const author = await authors.create({name, biography, imageUrl});
        return res.json(author);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
    
});


//author delete

app.delete('/author/:id', async(req, res) => {
    const author_id = req.params.id;
    try {
        const author = await authors.findOne({
            where: { author_id }});
            await author.destroy();
            return res.json({message:'Author Deleted!'});
        }
       
    
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}); 

//authors PUT

app.put('/author/:id',upload_author.single('image'), async(req,res)=>{
    const author_id = req.params.id;
    const {name,biography}=req.body;
    const imageFile = req.file;
    let imageUrl;
    try{
        if(imageFile){
        // unique filename
        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const oldPath = path.join(__dirname, imageFile.path);
        const newPath = path.join(__dirname, 'Author-Images', uniqueFilename + path.extname(imageFile.originalname));
        imageUrl = '/Author-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
        fs.rename(oldPath, newPath, err => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to move uploaded file' });
            return;
        }
        imageUrl = '/Author-Images/' + path.basename(newPath); // Example: '/uploads/1626027617853-425340324.jpg'
        // Respond with success message
        //res.json({ message: 'Image uploaded successfully', imageUrl });
    });
}
}catch(err){
    }
    try{
        const author = await authors.findOne({
            where: { author_id }});
            if(name){
                author.name=name;}
            if(biography){
                author.biography=biography;}
            
            if(imageUrl){
                author.imageUrl = imageUrl;
            }
            await author.save();
        return res.json(author) ;
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

/*---------GENRES-------------*/
//genres GET
app.get("/genres", async (req, res) => {
    try {
      const genres_list = await genres.findAll();
      res.json(genres_list);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });
  //genres GET one
  app.get("/genre/:id", async (req, res) => {
    const genre_id = req.params.id;
    try {
      const genre = await genres.findOne({
        where: { genre_id },
      });
      res.json(genre);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });
  //genres POST
  app.post("/genre", async (req, res) => {
    const { genre_name } = req.body;
    const genre = await genres.create({ genre_name });
    return res.json(genre);
  });
  //genres delete
  app.delete("/genre/:id", async (req, res) => {
    const genre_id = req.params.id;
    try {
      const genre = await genres.findOne({
        where: { genre_id },
      });
      await genre.destroy();
      return res.json({ message: "genre Deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });
  //genres PUT
  app.put("/genre/:id", async (req, res) => {
    const genre_id = req.params.id;
    const { genre_name } = req.body;
    try {
      const genre = await genres.findOne({
        where: { genre_id },
      });
      if (genre_name) {
        genre.genre_name = genre_name;
      }
      await genre.save();
      return res.json(genre);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
/* app.get('/genres', async(req, res) => {
    try {
        const genres_list = await genres.findAll();
        res.json(genres_list);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});


//genres GET one

app.get('/genre/:id', async(req, res) => {
    const genre_id = req.params.id;
    try {
        const genre = await genres.findOne({
            where: { genre_id },
        });
        res.json(genre);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});


//genres POST

app.post('/genre', async(req, res) => {
    const {genre_name} = req.body;
        const genre = await genres.create({genre_name});
        return res.json(genre);
    
    
});


//genres delete

app.delete('/genre/:id', async(req, res) => {
    const genre_id = req.params.id;
    try {
        const genre = await genres.findOne({
            where: { genre_id }});
            await genre.destroy();
            return res.json({message:'genre Deleted!'});
        }
       
    
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}); 

//genres PUT

app.put('/genre/:id', async(req,res)=>{
    const genre_id = req.params.id;
    const {genre_name}=req.body;
    
    
    try{
        const genre = await genres.findOne({
            where: { genre_id }});
            if(genre_name){
                genre.genre_name=genre_name;}
            
            await genre.save();
        return res.json(genre) ;
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});*/

app.listen({ port: 5000}, async () => {
    console.log('Server up on http://localhost:5000');
    await sequelize.sync();
    console.log('Database synced!');
});