import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/header'
import Post from '../components/post'
import "../styles/forum.css"
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import {addPost, getPosts} from "../api-service"
import { IPost } from '../types/types';
import { UserContext } from '../providers/userProvider';
import LogInModal from '../components/logInModal';


const Forum = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const user = useContext(UserContext)

    document.title = `Windsurf Norge`

    useEffect(() => {
        const fetchAndSetPosts = async () => {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts)
        }
        fetchAndSetPosts()
   }, [])

    const onSubmit = () => {
        if(user.user) {
            if(postTitle !== "") {
                addPost(postContent, postTitle, user.user.uid)
                const post: IPost = {
                    post: postContent,
                    post_title: postTitle,
                    date: new Date(),
                    displayname: user.dbUser!.displayname,
                    id: -1
                }
                setPosts([...posts, post])
            }
        }
        else {
            setShowLogInModal(true);
        }
    }


    return (
        <div>
            <Header
                title={"Forum"}
            />
            <div className="posts-container">
                
                <div className="post-container">
                    <h3 onClick={() => setIsOpen(!isOpen)} className="post-tittel">{"Hvordan bruke forumet?"}</h3>
                    <p className="italic post-username">{"sberbom"} {new Date().toLocaleString()}</p>
                    {isOpen &&
                        <p>For å bruke forumet må du være logget inn. Du vil ikke få noen varsel når noen svarer på posten din, det er under utvikling. Surfs up! </p>
                    }
                    <hr></hr>
                </div>
                {posts.slice(0).reverse().map((post, index) => <Post key={index} id={post.id} posttitel={post.post_title} post={post.post} username={post.displayname} date={post.date}/>)}
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Post tittel"
                    aria-label="post-tittel "
                    aria-describedby="basic-addon1"
                    onChange={(event) => setPostTitle(event.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <FormControl as="textarea" rows={7} aria-label="With textarea" placeholder="Post" onChange={(event) => setPostContent(event.target.value)}/>
                </InputGroup>
                <div className="post-button-container">
                    <Button className="post-button" onClick={onSubmit}>{user.user ? "Send inn" : "Logg inn for å opprette post"}</Button>
                </div>
            </div>
            {/**@ts-ignore */}
            <LogInModal show={showLogInModal} onHide={() => setShowLogInModal(false)}/>
        </div>
    )
}

export default Forum;