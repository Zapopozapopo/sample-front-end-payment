import React, {Component} from 'react';
import ProductItem from "../ProductItem/ProductItem";
import './productList.scss'

class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {products, isLogin, addToCart} = this.props;
        return (
            <div className="product-list">
                {products.map((product, index)=>{
                    return <ProductItem key={index} product={product} isLogin={isLogin} addToCart={addToCart} />
                })}
            </div>
        )
    }
}

export default ProductList