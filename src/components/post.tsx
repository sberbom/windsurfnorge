import React, { useEffect, useContext, useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { addPostComment, getPostsComments } from '../api-service';
import "../styles/post.css"
import {UserContext} from '../providers/userProvider';
import { IPostComment } from '../types/types';
import LogInModal from './logInModal';

interface IProps {
    posttitel: string,
    username: string,
    date: Date,
    post: string,
    id: number
}

const Post = ({posttitel, username, date, post, id}:IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [comments, setComments] = useState<IPostComment[]>([])
    const [comment, setComment] = useState<string>("")
    const [showLogInModal, setShowLogInModal] = useState(false);
    const user = useContext(UserContext)

    document.title = `Windsurf Norge`

    const onAddComment = () => {
        if(user.user){
            const newComment: IPostComment = {post: comment, date: new Date(), displayname: user!.dbUser!.displayname!}
            setComments([...comments, newComment])
            addPostComment(comment, id, user.user.uid)
            setComment("")
        }
        else {
            setShowLogInModal(true);
        }
    }

    useEffect(() => {
        const fetchAndSetComments = async () => {
            const fetchedComments = await getPostsComments(id);
            setComments(fetchedComments);
        }
        fetchAndSetComments();
    }, [isOpen, id])

    return (
        <div className="post-container">
            <h3 onClick={() => setIsOpen(!isOpen)} className="post-tittel">{posttitel}</h3>
            <p className="italic post-username">{username} {new Date(date).toLocaleString()}</p>
            {isOpen &&
                <>
                    <p className="format">{post}</p>
                    {comments.map((comment, index) => 
                        <div key={index}>
                            <p className="italic post-username">{comment.displayname} {new Date(comment.date).toLocaleString()}</p>
                            <p className="format">{comment.post}</p>
                        </div>
                        )} 
                    <InputGroup>
                        <FormControl as="textarea" rows={4} aria-label="With textarea" placeholder="Svar" onChange={(event) => setComment(event.target.value)}/>
                    </InputGroup>
                    <div className="post-button-container">
                        <Button className="post-button" onClick={onAddComment}>
                            {user.user ? "Send inn" : "Logg inn for å svare på posten"}
                        </Button>
                    </div>
                </>
            }
            <hr></hr>
            {/**@ts-ignore */}
            <LogInModal show={showLogInModal} onHide={() => setShowLogInModal(false)}/>
        </div>
    )
}

export default Post;