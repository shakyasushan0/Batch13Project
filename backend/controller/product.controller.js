import Product from "../model/Product.js";

const getProducts = async (req, res) => {
    const products = await Product.find().populate('user', 'fullname email -_id');
    res.send(products)
}

const getProductById = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        return res.status(404).send({error: "Product not found!"})
    }
    res.send(product)
}

const addProduct = async (req, res) => {
    const data = {
        user: req.user._id,
        name: 'Sample Product',
        description: 'Sample product description',
        brand: 'Sample Brand',
        category: 'Sample Category',
    }
    const product = await Product.create(data)
    res.status(201).send({message: 'Product created!', product})
}

const updateProduct = async (req, res) => {
    const {name, description, price, category, brand, image, countInStock} = req.body;
    const {id} = req.params;
    const product = await Product.findById(id)
     if(!product){
        return res.status(404).send({error: "Product not found!"})
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.image = image || product.image;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
    res.send({message: 'Product Updated!', product: updatedProduct})
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).send({error: "Product not found!"})
    }
    res.send({message: "Product deleted!", product})
}

const addReview = async (req, res) => {
    const {rating, comment} = req.body;
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product) {
        return res.status(404).send({error: 'Product not found!'})
    }


    const alreadyReviewed = product.reviews.find(r => String(r.user) == String(req.user._id))
    if(alreadyReviewed) return res.status(400).send({error: "Already reviewed!"})

    const review = {
        rating,
        comment,
        user: req.user._id
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length;
    product.ratings = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews
    await product.save()
    res.send({message: "review added!"})


}

export {getProducts, getProductById, addProduct, updateProduct,deleteProduct, addReview}