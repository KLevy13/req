import React, { useState } from 'react';
import styles from '../styles/postItem.css';
import EditPost from './EditPost.js'

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
        axios.post('http://localhost:3000/posts/like/' + post._id)
            .then(res => {
               
                afterLike(post._id);
            })
            .catch(err => console.log(err));
    }

    const onDelete = () => {
        axios.delete('http://localhost:3000/posts/delete/' + post._id)
            .then(res => {
           
                afterDelete(post._id);
            })
            .catch(err => console.log(err));
    }

    post.likes = post.likes || []
    return (
        <div >
            <div >
                <div>
                    <span>{post.username}</span>
                </div>
                
                <div className={styles.postBox} >
                <span><big><b>{post.title}</b></big></span>
                <div className="grey-text">{post.creator}</div>
                        <div>{post.medium}</div>
                    <img src={post.file} alt="An error occurred."/>
                    <div><i>{post.writeUp}</i></div>
                    {!isEditing
                  ? <div>
                      
                        {username === post.username &&
                            <span >
                                <span/>
                                <button  className={styles.button} onClick={() => setEditingState(true)}>edit</button>
                                <span />
                                <button  className={styles.button} onClick={onDelete}>unReq</button>
                            </span>
                        }
                        <span>
                            {/* <span className="btn-floating btn-small btn-flat white"><big>{post.likes.length}</big></span>
                            {/* {post.likes.includes(username)
                              ? <button className='' onClick={onLike}><i className="material-icons">thumb_up</i></button>
                              : <button className=''onClick={onLike}><i className="material-icons">like</i></button>
                            } */}
                        </span> 
                     
                        
                    </div>
                  : <EditPost post={post} afterEdit={afterEdit} setEditingState={setEditingState}/>
                }
                  
                </div>
                
            </div>
        </div>
    );
}

export default Post;