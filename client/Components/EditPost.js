import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditPost = ({ post, afterEdit, setEditingState }) => {
    const [title, setTitle] = useState(post.title);
    const [creator, setCreator] = useState(post.creator);
    const [writeUp, setWriteUp] = useState(post.writeUp);
    const [medium, setMedium] = useState(post.medium);


    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeCreator = (e) => {
        setCreator(e.target.value);
    }

    const onChangeWriteUp = (e) => {
        setWriteUp(e.target.value);
    }

    const onChangeMedium = (e) => {
        setMedium(e.target.value);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            title: title,
            creator: creator,
            writeUp: writeUp,
            medium: medium,
            file: post.file
        }
        axios.post('http://localhost:3000/posts/edit/' + post._id, updatedPost)
            .then(res => {
                console.log(res.data);
                afterEdit(post._id, updatedPost);
                setEditingState(false);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="card-content">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input required id="title" type="text" value={title} onChange={onChangeTitle}/>
                    <label className="active" htmlFor="title">Title</label>
                </div>
                <div className="input-field">
                    <input required id="creator" type="text" value={creator} onChange={onChangeCreator}/>
                    <label className="active" htmlFor="creator">Creator</label>
                </div>
                <div className="input-field">
                    <textarea required id="description" className="materialize-textarea" value={writeUp} onChange={onChangeWriteUp}/>
                    <label className="active" htmlFor="description">writeUp</label>
                </div>
                <div className="input-field">
                    <textarea required id="description" className="materialize-textarea" value={medium} onChange={onChangeMedium}/>
                    <label className="active" htmlFor="description">medium</label>
                </div>
                <div className="right-align">
                    <button className="btn-small waves-effect waves-light" onClick={() => setEditingState(false)}>Cancel</button>
                    <span style={{ paddingRight: "10px" }}/>
                    <button type="submit" className="btn-small waves-effect waves-light">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;