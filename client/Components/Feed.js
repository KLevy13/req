// import React, { Component } from 'react';
// import Post from './Posts';
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// import styles from '../styles/feedStyles.css';


// export default class Feed extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             posts: [{
                
//             }]
//         }
//         this.loadFeed = this.loadFeed.bind(this)
//         //this.generateReq = this.generateReq(this)
//     }

//     // generateReq(){
//     //   return new Form()
//     // }

//     loadFeed(url = this.props.url) {
//         fetch(url)
//             .then(data => data.json())
//             .then(feed => this.setState({ urls: feed }))
//     }
//     ComponentDidMount(){
//         this.loadFeed()
//     }

//     render() {
//         return (
//             <div style={styles} id='feed'>
//                 {this.state.posts.map((post, i) => 
//                 (<Posts
//                 key={i}
//                 title={post.title}
//                 medium={post.medium}
//                 creator={post.creator}
//                 writeUp={post.writeUp}
//                 image={post.image}
//                 />)
//                 )}
//                  <div><FormSubmission /></div>
//             </div>
           
            
//         );
//     }
// }

//   //{/* <form className='form'>
//                 // <fieldset>
//                 //     <label>
//                 //         <p>Title</p>
//                 //         <input title="title"/>
//                 //         <p>Medium</p>
//                 //         <input medium="medium"/>
//                 //         <p>Creator</p>
//                 //         <input creator="creator"/>
//                 //         <p>Image</p>
//                 //         <input image="src"/>
//                 //         <p>Comments</p>
//                 //         <input comments="comments"/>
//                 //     </label>
//                 // </fieldset>
//                 // 
//                 // </form>
//                 // </div> */}

import React, { useState, useEffect } from 'react';
import Post from './Posts.js';
import axios from 'axios';
import styles from '../styles/feedStyles.css'
axios.defaults.withCredentials = true;

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3000/posts')
            .then(res => {
                setPosts(res.data.posts.reverse());
                setUsername(res.data.username)
            })
            .catch(err => console.log(err));
    }, []);

    const afterLike = (id) => {
        setPosts(posts.map(post => {
            if (post._id === id) {
                if (post.likes.includes(username)) {
                    post.likes = post.likes.filter(user => user !== username);
                } else {
                    post.likes.push(username);
                }
            }
            return post;
        }));
    }

    const afterEdit = (id, editedPost) => {
        setPosts(posts.map(post => {
            if (post._id === id) {
                post.title = editedPost.title;
                post.creator = editedPost.creator;
                post.writeUp = editedPost.writeUp;
                post.medium = editedPost.medium
            }
            return post;
        }));
    }

    const afterDelete = (id) => {
        setPosts(posts.filter(post => post._id !== id));
    }

    return (
        <div > 

             <p className={styles.author}><i>Kellen's Req's</i></p>
             <p className={styles.section}><i>Films</i></p>
            <div className={styles.container}>
           
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }}>
                        
                    </div>
                  : posts.filter(el => el.medium === 'Film').map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}  />
                    })
                }
        </div>
        <p className={styles.section}><i>Songs</i></p>
              <div className={styles.container}>
              
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }}>
                        
                    </div>
                  : posts.filter(el => el.medium === 'Song').map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}  />
                    })
                }
               </div>
               <p className={styles.section}><i>Novels</i></p>
               <div className={styles.container}>
          
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }}>
                        
                    </div>
                  : posts.filter(el => el.medium === 'Novel').map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}  />
                    })
                }
              </div>
              <p className={styles.section}><i>Episodes</i></p>
           <div className={styles.container}>
              
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }}>
                        
                    </div>
                  : posts.filter(el => el.medium === 'TV Episode').map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}  />
                    })
                }
               </div>
               <p className={styles.section}><i>Albums</i></p>
             <div className={styles.container}>
             
                {posts.length === 0
                  ? <div style={{ paddingTop: "50px" }}>
                        
                    </div>
                  : posts.filter(el => el.medium === 'Album').map(post => {
                        return <Post post={post} username={username} afterLike={afterLike} afterEdit={afterEdit} afterDelete={afterDelete} key={post._id}  />
                    })
                }
                </div>
            
        </div>
   
     
    );
}

export default Feed;