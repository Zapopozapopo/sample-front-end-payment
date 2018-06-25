import React, {Component} from 'react';
import './cartList.scss'
import CartItem from "./CartItem/CartItem";
import Checkout from "../Checkout/CheckoutComponent";

class CartList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {products,totalPrice, deleteFromCart} = this.props;
        return (
            <div className="cart-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products? products.map((product, index)=>{
                        return <CartItem key={index} product={product} deleteFromCart={deleteFromCart}/>
                    }):null}
                    </tbody>
                </table>
                <p>Total Price: {totalPrice}</p>
                <div className="d-flex flex-direction-row">
                    <Checkout
                        name={'Payment'}
                        description={'Products Pay'}
                        amount={totalPrice}
                    />
                </div>
            </div>
        )
    }
}

export default CartList