const express = require('express');
const { sequelize,books } = require('./models')

const app = express();
app.use(express.json());
app.post('/books',async(req,res)=>{
    const {title,price,publication_date}=req.body;
    try{
        const book= await books.create({title,price,publication_date});
        return res.json(book) ; 
    }catch(err){
        console.log(err);
        return res.status(500).json(err);

    }

})
app.get('/books', async(req, res) => {
    try {
        const books_list = await books.findAll();
        res.json(books_list);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});

app.get('/book/:id', async(req, res) => {
    const book_id = req.params.id;
    try {
        const book = await books.findOne({
            where: { book_id },
        });
        res.json(book);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
});

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

app.put('/book/:id',async(req,res)=>{
    const book_id = req.params.id;
    const {title,price,publication_date}=req.body;
    try{
        const book = await books.findOne({
            where: { book_id }});
            book.title=title;
            book.price=price;
            book.publication_date=publication_date;
            await book.save();
        return res.json(book) ; 
    }catch(err){
        console.log(err);
        return res.status(500).json(err);

    }

})
app.listen({port :5000},async()=>{
    console.log("Server Up On http://localhost:5000");
    await sequelize.authenticate();
    console.log("database connected!");
})
    
