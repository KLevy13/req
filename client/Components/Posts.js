import React, { Component } from 'react';
//import styles from '../styles/postItem.css';
import EditPost from './EditPost.js'
//import Moment from 'react-moment'
import axios from 'axios';
axios.defaults.withCredentials = true;

// export default class Posts extends Component {
//     render () {
//         return (
//                 <div className={styles.post}>
//                     <h2>{this.props.title}</h2>
//                     <h2>{this.props.medium}</h2>
//                     <h2>{this.props.creator}</h2>
//                     <p>{this.props.writeUp}</p>
//                     <img src={this.props.image} />
//                 </div>
//         )
//     }
// }

const Post = ({ post, username, afterLike, afterEdit, afterDelete }) => {
    const [isEditing, setEditingState] = useState(false);

    const onLike = () => {
        axios.post('http://localhost:8080/posts/like/' + post._id)
            .then(res => {
               
                afterLike(post._id);
            })
            .catch(err => console.log(err));
    }

    const onDelete = () => {
        axios.delete('http://localhost:8080/posts/delete/' + post._id)
            .then(res => {
           
                afterDelete(post._id);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="section">
            <div className="card z-depth-1 hoverable">
                <div className="card-action">
                    
                  
                </div>
                <div className="card-image">
                    <img src={post.file} alt="An error occurred."/>
                </div>
                {!isEditing
                  ? <div className="card-content">
                        <span><big><b>{post.title}</b></big></span>
                        {
                            <span className="right">
                                <span style={{ paddingLeft: '5px' }}/>
                                <button className="btn-floating btn-small waves-effect waves-light" onClick={() => setEditingState(true)}><i className="material-icons">edit</i></button>
                                <span style={{ paddingLeft: '5px' }}/>
                                <button className="btn-floating btn-small waves-effect waves-light" onClick={onDelete}><i className="material-icons">delete</i></button>
                            </span>
                        }
                        <span className="right">
                            <span className="btn-floating btn-small btn-flat white"><big>{post.likes.length}</big></span>
                            {post.likes.includes(username)
                              ? <button className="btn-floating btn-small waves-effect waves-light red lighten-1" onClick={onLike}><i className="material-icons">thumb_up</i></button>
                              : <button className="btn-floating btn-small waves-effect waves-light" onClick={onLike}><i className="material-icons">thumb_up</i></button>
                            }
                        </span>
                        <div className="grey-text">{'By: ' + post.creator}</div>
                        <div>{post.description}</div>
                    </div>
                  : <EditPost post={post} afterEdit={afterEdit} setEditingState={setEditingState}/>
                }
            </div>
        </div>
    );
}

export default Post;