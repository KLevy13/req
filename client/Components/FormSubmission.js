import React, {useState} from 'react';
//import styles from '../styles/FormStyles.css'
import axios from 'axios';
axios.defaults.withCredentials = true

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [writeUp, setWriteUp] = useState('');
  const [medium, setMedium] = useState('');
  const [file, setFile] = useState('');

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

        axios.post('/posts/', post)
        .then(res => {
            console.log(res.data);
            window.location = '/posts/';
        })
        .catch(err => console.log(err));
    
    }
  }

  return (
    <div className="row">
            <div className="innerRow">
                <div className="section">
                    <h3>Make a Req</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="input-field">
                            <input required id="title" type="text" value={title} onChange={onChangeTitle}/>
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <input required id="title" type="text" value={medium} onChange={onChangeMedium}/>
                            <label htmlFor="medium">Medium</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <input required id="creator" type="text" value={creator} onChange={onChangeCreator}/>
                            <label htmlFor="creator">Creator</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <textarea required id="writeUp" className="writeUpTextArea" value={writeUp} onChange={onChangeWriteUp}/>
                            <label htmlFor="writeUp">Thoughts</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="file-field">
                            <div className="btn-small">
                                <span>Upload File</span>
                                <input required type="file" accept="image/*" onChange={onChangeFile}/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path" placeholder="Upload an image file"/>
                            </div>
                        </div>
                    </div>
                    <div className="row center-align">
                        {file.length > 0 && <img className="responsive-img" src={file} alt="Invalid file upload."/>}
                    </div>
                    <div className="row">
                        <button type="submit" className="submitbutton" onClick={onSubmit}>Req</button>
                        <div className="col s12" style={{ paddingBottom: "10px" }}/>
                        <button className="clearButton" onClick={onClear}>Kill Req</button>
                    </div>
                </form>
            </div>
        </div>

  )


}

export default CreatePost;