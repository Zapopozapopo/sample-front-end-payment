import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import {SignUpComponent} from "../components/index";
import {signUp} from "../redux/modules/auth.reducer";

@connect(
    ({auth, form}) => ({
        auth:auth,
        form:form
    }), {
        signUp
    }
)

class SignUpContainer extends Component {
    constructor(props) {
        super(props);
    }

    submit =(form)=>{
        this.props.signUp(form.username, form.email, form.password)
            .then(()=>{
                this.props.history.push('/signIn')
            }).catch((error)=>{
            console.log(error.response.data);
        }
    );
    };

    render() {
        const{registerError} = this.props.auth;
        console.log(registerError);
        return (
        <div className="d-flex flex-column" style={{alignItems:'center'}}>
                <SignUpComponent onSubmit={this.submit}/>
                {registerError?<div style={{color:'red', fontWeight:'500'}}>{registerError}</div>:null}
            </div>
        )
    }
}

export default withRouter(SignUpContainer)