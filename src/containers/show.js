import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import marked from 'marked';
import Textarea from 'react-textarea-autosize';
import { deletePost, updatePost, fetchPost } from '../actions/index.js';

class Show extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title_isEditing: false,
      tags_isEditing: false,
      content_isEditing: false,
      tempTitle: '',
      tempTags: '',
      tempContent: '',
    };

    this.updateText = this.updateText.bind(this);
    this.updateTextTypeState = this.updateTextTypeState.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  updateText(newText, TextType) {
    let titleText = this.props.current_post.title;
    let tagsText = this.props.current_post.tags;
    let contentText = this.props.current_post.content;

    switch (TextType) {
      case 'title':
        titleText = newText;
        break;
      case 'tags':
        tagsText = newText;
        break;
      case 'content':
        contentText = newText;
        break;
      default:
        break;
    }

    this.props.updatePost(this.props.params.id, { title: titleText, tags: tagsText, content: contentText });
  }

  updateTextTypeState(TextType) {
    switch (TextType) {
      case 'title':
        this.updateText(this.state.tempTitle, 'title');
        this.setState({ title_isEditing: !this.state.title_isEditing });
        break;
      case 'tags':
        this.updateText(this.state.locTags, 'tags');
        this.setState({ tags_isEditing: !this.state.tags_isEditing /* first: !this.state.first*/ });
        break;
      case 'content':
        this.updateText(this.state.locContent, 'content');
        this.setState({ content_isEditing: !this.state.content_isEditing });
        break;
      default:
        break;
    }
  }

  // render functions

  renderTitle() {
    if (this.props.current_post != null) {
      if (this.state.title_isEditing) {
        return (
          <div>
            <Textarea className="titlebox"
              defaultValue={this.props.current_post.title}
              // ref={this.focus}
              onTextTypeUpdate={() => this.updateTextTypeState('title')}
              onChange={(event) => this.setState({ tempTitle: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="titlebox" onClick={() => this.setState({ title_isEditing: !this.state.title_isEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.current_post.title || '') }}
          />
        );
      }
    } else {
      return <div>loading title</div>;
    }
  }

  renderTags() {
    if (this.props.current_post != null) {
      if (this.state.tags_isEditing) {
        return (
          <div>
            <Textarea className="tagbox"
              defaultValue={this.props.current_post.tags}
              // ref={this.focus}
              onTextTypeUpdate={() => this.updateTextTypeState('tags')}
              onChange={(event) => this.setState({ tempTags: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="tagbox" onClick={() => this.setState({ tags_isEditing: !this.state.tags_isEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.current_post.tags || '') }}
          />
        );
      }
    } else {
      return <div>loading tags</div>;
    }
  }

  renderContent() {
    if (this.props.current_post != null) {
      if (this.state.content_isEditing) {
        return (
          <div>
            <Textarea className="contentbox"
              defaultValue={this.props.current_post.content}
              // ref={this.focus}
              onTextTypeUpdate={() => this.updateTextTypeState('content')}
              onChange={(event) => this.setState({ tempContent: event.target.value })}
            />
          </div>
        );
      } else {
        return (
          <div className="textbox" onClick={() => this.setState({ content_isEditing: !this.state.content_isEditing })}
            dangerouslySetInnerHTML={{ __html: marked(this.props.current_post.content || '') }}
          />
        );
      }
    } else {
      return <div>loading content</div>;
    }
  }

  render() {
    return (
      <div className="show">
        <div className="showHeader">
          <Link to="/"><span><i className="fa fa-arrow-left" aria-hidden="true"></i>back to post list</span></Link>
          <button onClick={() => this.props.deletePost(this.props.params.id)}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>delete
          </button>
        </div>
        <div className="postInfo">
          <div className="textSection">{this.renderTitle()}</div>
          <div className="textSection">{this.renderTags()}</div>
          <div className="textSection">{this.renderContent()}</div>
        </div>
      </div>
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
export default connect(mapDispatchToProps, { deletePost, updatePost, fetchPost })(Show);
