import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../NewPost/NewPost';
import classes from './Blog.module.css';
import axios from 'axios';
class Blog extends Component {
    state={
        posts:[],
        selectedPostId:null,
        error: false
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/posts-list')
            .then(response =>{
                const posts=response.data.slice(0, 4);
                const updatedPosts=posts.map(post=>{
                    console.log(post)
                   
                    return{
                        ...post,
                        author:post.user.username
                    }
                })
                this.setState({posts:updatedPosts});
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
            
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    postSelectedHandler=(id)=>{
this.setState({selectedPostId:id});
    }
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (!this.state.error) {
         posts=this.state.posts.map(post=>{
           
            return <Post title={post.title}   
            author={post.author}
            clicked={()=>this.postSelectedHandler(post.id)}/>;
        });
        }
        return (
            <div>
                <section className={classes.Post}>
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
            </div>
        );
    }
}

export default Blog;