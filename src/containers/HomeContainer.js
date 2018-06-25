import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import {ProductList} from "../components/index";
import {getProducts} from "../redux/modules/product.reducer"
import {addToCart} from "../redux/modules/cart.reducer"
import {saveCart} from '../helpers/cartStorage'

@connect(
    ({product, auth, cart}) => ({
        product: product,
        cart:cart,
        auth:auth
    }), {
        getProducts,
        addToCart
    }
)

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getProducts();
    }

    handleAddToCart =(productId)=>{
        this.props.addToCart(productId).then(()=>{
                saveCart(this.props.cart.idList)
            }
        )
    };

    render() {return (
        <div className="d-flex flex-column">
            <ProductList products={this.props.product.products} isLogin={this.props.auth.isLogin} addToCart={this.handleAddToCart}/>
        </div>
    )
    }
}

export default withRouter(HomeContainer)