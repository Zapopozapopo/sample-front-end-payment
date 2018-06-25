import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {STRIPE_PUBLISHABLE} from '../../helpers/config'
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import {removeCart} from "../../helpers/cartStorage";
import {pay} from '../../redux/modules/cart.reducer'
import {CURRENCY} from "../../helpers/config";

@connect(
    ({cart}) => ({
        cart
    }), {
        pay
    }
)

export class Checkout extends React.Component{
    fromUahToCop = amount => amount * 100;

    successPayment = () => {
        alert('Payment Successful');
        removeCart();
        this.props.history.push('/');
    };

    errorPayment = () => {
        alert('Payment Error');
    };
    render(){
        const {name, description, amount,cart} = this.props;
        return<StripeCheckout
            name={name}
            description={description}
            amount={this.fromUahToCop(amount)}
            token={(token)=>this.props.pay(cart.idList,amount,description, token).then(this.successPayment).catch(this.errorPayment)}
            currency={CURRENCY}
            stripeKey={STRIPE_PUBLISHABLE}
        />;
    }
}

export default withRouter(Checkout);