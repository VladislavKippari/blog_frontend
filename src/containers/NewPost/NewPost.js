import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './NewPost.module.css';
import * as actions from '../../store/actions/index';

import './NewPost.module.css';

class NewPost extends Component {
    state = {
        selectValue:'Admin',
       
        controls: {
            title:{
                elementType: 'input',
               
                value: '',
               
            },
            body:{
                elementType: 'input',
                value: ''
                
                
            }
            
    }
}

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
            }
        };
        this.setState( { controls: updatedControls } );
    }
    submitHandler = ( event ) => {
        event.preventDefault();
        
       const userId=localStorage.getItem('userId');
        this.props.onPostSubmit(userId, this.state.controls.title.value, this.state.controls.body.value );
        
    }
  
    render () {
       let form=[];
       form.push(<div key='container' className={classes.NewPost}>
            <h1 key='heading'>Add a Post</h1>
            <label key='title'>Title</label>
            <input key='titl' type="text"  onChange={( event ) => this.inputChangedHandler( event, 'title' )} />
            <label key='content'>Content</label>
            <textarea key='text' rows="4"  onChange={( event ) => this.inputChangedHandler( event, 'body' )} />
            <Button key='btn'  btnType="Success">SUBMIT</Button>
        </div>);
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.response.data.detail}</p>
            );
        }
        
        return (
            
            <form key='frm' onSubmit={this.submitHandler}>
            {errorMessage}
            {form}
            
        
        
            
            </form>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.newPost.loading,
        error: state.newPost.error
    };
};
const mapDispatchToProps = dispatch => {
    
    return {
        
        onPostSubmit: ( userId,title,body) => dispatch( actions.postDataHandler(userId,title,body ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( NewPost );