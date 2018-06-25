import React, {Component} from 'react';
import './productItem.scss'

class ProductItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {product, isLogin, addToCart} = this.props;
        return (
            <div className="product-item">
                <h5 className='title'>{product.title}</h5>
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
                <button disabled={!isLogin} className='btn btn-success' onClick={()=>{addToCart(product._id)}}>Add to cart</button>
            </div>
        )
    }
}

export default ProductItem