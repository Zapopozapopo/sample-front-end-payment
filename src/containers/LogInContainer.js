import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import {LogIn} from "../components/index";
import {logIn} from "../redux/modules/auth.reducer";

@connect(
    ({auth, form}) => ({
        auth:auth,
        form:form
    }), {
        logIn
    }
)

class LogInContainer extends Component {
    constructor(props) {
        super(props);
    }

    submit =(form)=>{
        this.props.logIn(form.email,form.password )
            .then(()=>{
                this.props.history.push('/');
            }).catch(error=>{
            console.log(error.response.data);
        });
    };

    render() {
        const{loginError} = this.props.auth;
        return (
        <div className="d-flex flex-column" style={{alignItems:'center'}}>
            <LogIn onSubmit={this.submit}/>
            {loginError?<div style={{color:'red', fontWeight:'500'}}>{loginError}</div>:null}
        </div>
    )
    }
}

export default withRouter(LogInContainer)