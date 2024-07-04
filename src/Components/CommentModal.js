import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Box,
    Text,
} from '@chakra-ui/react';

export const CommentModal = ({ isOpen, onClose, postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:4000/comment/${postId}`);
            const res = await response.json();
            setComments(res);
        } catch (err) {
            console.log("error" + err);
        }
    };

    const handleAddComment = async () => {
        try {
            const commentData = {
                name: user.name,
                userId: user.userId,
                content: newComment,
            };
            await fetch(`http://localhost:4000/comment/${postId}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(commentData),
            });
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment', error);
        }
    };

    const Comment = ({ comment, fetchComments }) => {
        const [showReplies, setShowReplies] = useState(false);
        const [newReply, setNewReply] = useState('');
        const [replyTo, setReplyTo] = useState(null);

        const handleAddReply = async (parentCommentId, replyToName) => {
            try {
                await fetch('http://localhost:4000/comment/reply/post', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: user.name,
                        userId: user.userId,
                        content: replyToName ? `@${replyToName} ${newReply}` : newReply,
                        parentCommentId: parentCommentId,
                    }),
                });
                setNewReply('');
                setReplyTo(null);
                fetchComments();
            } catch (error) {
                console.error("error" + error);
            }
        };

        return (
            <Box mb={4}>
                <Text fontWeight="bold" fontSize={14}>{comment.name}:</Text>
                <Text>{comment.content}</Text>
                <Button cursor="pointer" size="xs" backgroundColor="white" onClick={() => setShowReplies(!showReplies)}>
                    {showReplies ? 'Hide Replies' : 'View Replies'}
                </Button>

                {showReplies && (
                    <Box mt={2} pl={4} borderLeft="2px solid #EAEAEA">
                        {comment.replies.map((reply) => (
                            <Box key={reply._id} mt={2}>
                                <Text fontWeight="bold" fontSize={13}>{reply.name}:</Text>
                                <Text mt={2} fontSize={13}>
                                    {reply.content}
                                </Text>
                                <Button
                                    cursor="pointer"
                                    size="xs"
                                    backgroundColor="white"
                                    onClick={() => setReplyTo(reply)}
                                >
                                    &#8212;Reply&#8212;
                                </Button>
                            </Box>
                        ))}

                        {(replyTo || newReply || showReplies) && (
                            <>
                                <Input
                                    placeholder={`Reply to ${replyTo ? replyTo.name : comment.name}`}
                                    size="sm"
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    mt={2}
                                    border="1px solid #EAEAEA"
                                />
                                <Button
                                    size="sm"
                                    mt={2}
                                    cursor="pointer"
                                    onClick={() => handleAddReply(comment._id, replyTo ? replyTo.name : null)}
                                >
                                    Post
                                </Button>
                            </>
                        )}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={25}>
                    <ModalHeader display="flex" justifyContent="center">Comments</ModalHeader>
                    <ModalCloseButton cursor="pointer" />

                    <ModalBody>
                        <Box maxHeight="20rem" overflowY="scroll" mb={0} width="100%" padding={2} border="3px solid #EAEAEA" borderRadius={10}>
                            {Array.isArray(comments) && comments.map((comment) => (
                                <Comment key={comment._id} comment={comment} fetchComments={fetchComments} />
                            ))}
                        </Box>
                        <Box key={'l'} display="flex" justifyContent="center" alignItems="center">
                            <textarea
                                placeholder="Add a comment"
                                style={{
                                    borderRadius: "4rem",
                                    height: "49px",
                                    padding: "20px",
                                    marginBottom: "15px",
                                }}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button height="40px" cursor="pointer" onClick={handleAddComment}>Post</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
