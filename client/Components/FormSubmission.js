import React, {useState} from 'react';
import styles from '../styles/FormStyles.css'
import {useHistory} from 'react-router-dom';

import axios from 'axios';
axios.defaults.withCredentials = true

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [writeUp, setWriteUp] = useState('');
  const [medium, setMedium] = useState('');
  const [file, setFile] = useState('');
  const history = useHistory();

    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    }

    const onChangeWriteUp = (e) => {
      setWriteUp(e.target.value);
    }

    const onChangeCreator = (e) => {
      setCreator(e.target.value);
    }

    const onChangeMedium = (e) => {
      setMedium(e.target.value);
    }

  const onChangeFile = (e) => {
      if (e.target.files.length === 0) {
          setFile('');
      } else {
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
              setFile(reader.result);
          }
      }
  }

  const onClear = (e) => {
    e.preventDefault();
    setTitle('');
    setCreator('');
    setWriteUp('');
    setMedium('');
    setFile('');
  }
 
  const onSubmit = (e) => {
    e.preventDefault();
    if (file.substring(0, 10).includes('image')) {
        const post = {
            title: title,
            creator: creator,
            writeUp: writeUp,
            medium: medium,
            file: file
        }

        axios.post('http://localhost:3000/posts/add', post)
        .then(res => {
            console.log("hello");
            history.push('/posts');
        })
        .catch(err => console.log(err));
    
    }
  }

  return (
    <div className={styles.formstyle}>
            <div className={styles.formstyle}>
                <div>
                    <h3>Make a Req</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className={styles.formstyle}>
                        <div className={styles.formstyle}>
                        <label htmlFor="title">Title</label>
                            <input required id="title" type="text" value={title} onChange={onChangeTitle}/>
                        </div>
                    </div>
                    <div className={styles.formstyle}>
                        <div className="input-field">
                        <label htmlFor="medium">Medium</label>
                            <input required id="title" type="text" value={medium} onChange={onChangeMedium}/>
                            
                        </div>
                    </div>
                    <div className={styles.formstyle}>
                        <div className="input-field">
                        <label htmlFor="creator">Creator</label>
                            <input required id="creator" type="text" value={creator} onChange={onChangeCreator}/>
                            
                        </div>
                    </div>
                    <div className={styles.formstyle}>
                        <div className="input-field">
                        <label htmlFor="writeUp">Thoughts</label>
                            <textarea required id="writeUp" className="writeUpTextArea" value={writeUp} onChange={onChangeWriteUp}/>
                            
                        </div>
                    </div>
                    <div className={styles.formstyle}>
                        <div  >
                            <div >
                                <span>Upload Image</span>
                                <input required type="file"  accept="image/*" onChange={onChangeFile}/>
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.formstyle}>
                        {file.length > 0 && <img src={file} alt="Invalid file upload."/>}
                    </div>
                    <div >
                        <button type="submit" className={styles.button} >Req</button>
                      
                        <button className={styles.button}  onClick={onClear}>Kill Req</button>
                    </div>
                </form>
            </div>
        </div>

  )


}

export default CreatePost;