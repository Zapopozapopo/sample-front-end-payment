import React, {Component} from 'react';
import './RenderField.scss'

class RenderField extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {input,id,novalidate, label, type, meta: {touched, error}} = this.props;
            return (
            <div>
                <label className="fieldTitle">{label}{!novalidate && <span>*</span>}</label>
                <div>
                    <input {...input} placeholder={label} type={type} id={id} className="form-control field"/>
                    {touched && error && !novalidate && <p><span className="errorMsg">{error}</span></p>}
                </div>
            </div>
        );
    }
}
export default RenderField