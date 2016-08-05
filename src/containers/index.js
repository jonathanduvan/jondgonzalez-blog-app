import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPosts } from '../actions/index.js';

class Index extends Component {

  constructor(props) {
    super(props);

    this.renderAllPosts = this.renderAllPosts.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderAllPosts() {
    if (this.props.posts != null) {
      return this.props.posts.map((post) => {
        return <li key={post.id}><Link to={`posts/${post.id}`}>{`${post.title} ${post.tags}`}</Link></li>;
      });
    } else {
      return <div>Oh no</div>;
    }
  }

  render() {
    return (
      <ul id="indexPostList">
        {this.renderAllPosts()}
      </ul>
    );
  }
}

const mapDispatchToProps = (state) => (
  {
    posts: state.posts.all,
    current_post: state.posts.post,
  }
);

// react-redux glue
export default connect(mapDispatchToProps, { fetchPosts })(Index);
