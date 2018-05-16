import React, { Component } from 'react';
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';

import Container from '../DnD/Container';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to="/posts"
                                    activeClassName="active"
                                >Posts</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="active"
                                    to={{
                                        pathname: "/new-post",
                                        search: ""
                                    }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not found</h1>} /> 
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
                <Container />
            </div>
        );
    }
}

export default Blog;