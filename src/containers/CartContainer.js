import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import {getCartProducts, deleteFromCart} from '../redux/modules/cart.reducer'
import CartList from "../components/CartList/CartList";
import {saveCart} from "../helpers/cartStorage";

@connect(
    ({product,cart, auth}) => ({
        auth:auth,
        cart:cart,
        product:product
    }), {
        getCartProducts,
        deleteFromCart
    }
)

class CartContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getCartProducts(this.props.cart.idList);
    }

    handleDelete =(productId)=>{
        this.props.deleteFromCart(productId).then(()=>{
                saveCart(this.props.cart.idList);
            }
        )
    };

    render() {
        const {cart} = this.props;
        return (
            <div className="d-flex flex-column">
                {cart.cartProducts&&cart.cartProducts.length!==0?
                    <CartList products={cart.cartProducts} totalPrice={cart.totalPrice} deleteFromCart={this.handleDelete}/>
                    :
                    <h2 style={{alignSelf:'center', marginTop:'5rem'}}>Your shopping cart is empty</h2>
                }
            </div>
        )
    }
}

export default withRouter(CartContainer)