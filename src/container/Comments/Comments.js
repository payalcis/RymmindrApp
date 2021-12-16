import { Message, MoreVert, ThumbUp, Send } from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Tooltip,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { getComments, addComment, commentLike, commentDelete } from '../../store/actions/commentActions';

import io from 'socket.io-client';
const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});

const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10,
}));

const AvatarComntStyled = styled(Avatar)({
  height: 42,
  width: 42,
  marginRight: 20,
});

const TextFieldStyled = styled(TextField)({
  width: 100 + '%',
  height: 50,
});

const EditCommentTextField = styled(TextField)({
  width: 95 + '%',
  height: 50,
});

const TypoCmntName = styled(Typography)({
  color: '#757575',
  fontWeight: 'bold',
  fontSize: 12,
  '& span': {
    fontWeight: 'normal',
    // marginLeft: 20,
  },
});
const TypoCmntTxt = styled(Typography)({
  color: '#3d3d3d',
  fontSize: 14,
});

const ButtonStyled = styled(Button)({
  color: '#757575',
  fontSize: 12,
  padding: 0,
  minWidth: 'auto',
});

const Comments = (props) => {
  const { type, postId, postUserId, comments, getComments, addComment, commentLike, commentDelete } = props;  
  const addCommentRef = React.useRef();
  const addReplyRef = React.useRef();
  const editCommentRef = React.useRef();

  const aceEditorRef = React.createRef();

  const { user_id, first_name, last_name, profile_image } = JSON.parse(localStorage.getItem('userData'));

  const [showComments, setShowComments] = useState([]);

  const [editCommentId, setEditCommentId] = useState(null);

  const [editCommentText, setEditCommentText] = useState('');

  const [commentTxt, setCommentTxt] = useState(null);
  const [replyTxt, setReplyTxt] = useState(null);

  const [commentOptions, setCommentOptions] = useState({
    actions: ['Turn off notifications...'],
  });

  // useEffect(() => {
  //   var pusher = new Pusher('b5678cf7a65e2065a151', {
  //     cluster: 'eu',
  //     encrypted: true,
  //   });
    
  //   var channel = pusher.subscribe('comment-add');
  //   if (postId && postUserId && type) {
  //     const dataToSend = {
  //       user_id: user_id,
  //       post_id: postId,
  //       post_type: type,
  //     };

  //     getComments(dataToSend);

  //     channel.bind('my-event', (data) => {
  //       if (data.post_id == postId && data.post_type == type) {
  //         const dataToSend2 = {
  //           user_id: user_id,
  //           post_id: data.post_id,
  //           post_type: data.post_type,
  //         };
  //         getComments(dataToSend2);
  //       }
  //     });
  //   }
  // }, [postId]);

  

  useEffect(() => {
    let mounted = true
    var sock = io("https://app.rymindr.com:8081");
    sock.on('comment-add:App\\Events\\CommentAdd', function (data){
        if (mounted) {
            console.log('Socket runningngngngngngngngngngngngngngngngngngngngngngng=',data.res);
            console.log('postId====',postId);
            if (data.res.post_id == postId && data.res.post_type == type) {
              const dataToSend2 = {
                user_id: user_id,
                post_id: data.res.post_id,
                post_type: data.res.post_type,
              };
              getComments(dataToSend2);
            }
        }
    })

    return function cleanup() {
        mounted = false
    }
}, [postId])


  useEffect(() => {
    
    if (postId && postUserId && type) {
      const dataToSend = {
        user_id: user_id,
        post_id: postId,
        post_type: type,
      };

      getComments(dataToSend);
    }

  }, [postId]);

  
  

  const handleClick = (event, parentIndex, childIndex, commentId, commentUserId) => {
    setAnchorEl(event.currentTarget);
    var actions = [];
    var loginUserId = parseInt(user_id);
    var postOwnerUserId = parseInt(postUserId);
    switch (parseInt(commentUserId)) {
      case loginUserId:
        actions = ['Edit...', 'Delete...', 'Turn off notifications...'];
        break;
      case postOwnerUserId:
        actions = ['Delete...', 'Turn off notifications...'];
        break;
      default:
        actions = ['Turn off notifications...'];
        break;
    }
    setCommentOptions({
      parentIndex,
      childIndex,
      commentId,
      commentUserId,
      actions,
    });
  };

  const handleCommentAction = (action, commentDetails) => {
    setAnchorEl(null);
    switch (action) {
      case 'Delete...':
        if (commentDetails.parentIndex !== null)
          comments[commentDetails.parentIndex]['replies'].splice(commentDetails.childIndex, 1);
        else comments.splice(commentDetails.childIndex, 1);
        const dataToSend = {
          user_id: user_id,
          id: commentDetails.commentId,
        };
        commentDelete(dataToSend);
        break;
      case 'Edit...':
        setEditCommentId(commentDetails.commentId);
        console.log('Edit action');
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddComment = (event) => {
    if (event == 'event') {
      if (commentTxt !== '') {
        const dataToSend = {
          user_id: user_id,
          post_id: props.postId,
          post_type: props.type,
          parent_comment_id: '',
          content: commentTxt,
          comment_type: 'text',
        };

        addComment(dataToSend);
        setCommentTxt('');
        addCommentRef.current.value = '';
      }
    } else if (event.key === 'Enter' && event.target.value !== '') {
      const dataToSend = {
        user_id: user_id,
        post_id: props.postId,
        post_type: props.type,
        parent_comment_id: '',
        content: event.target.value,
        comment_type: 'text',
      };

      addComment(dataToSend);
      event.target.value = '';
    }
  };

  const handleDisableComment = (event) => {
    if (event.keyCode === 27) {
      console.log('Esc button pressed');
      setEditCommentId(null);
      setEditCommentText('');
    }
  };

  const handleEditComment = (event, commentId, parentIndex, childIndex) => {
    if (event == 'event') {
      if (editCommentText !== '') {
        if (parentIndex === null) comments[childIndex].comment = editCommentText;
        else comments[parentIndex]['replies'][childIndex].reply = editCommentText;
        const dataToSend = {
          id: commentId,
          user_id: user_id,
          post_id: props.postId,
          post_type: props.type,
          parent_comment_id: '',
          content: editCommentText,
          comment_type: 'text',
        };
        addComment(dataToSend);
        // event.target.value = "";
        setEditCommentId(null);
        setEditCommentText('');
        editCommentRef.current.value = '';
      } else if (editCommentText === '') {
        setEditCommentText(
          parentIndex === null ? comments[childIndex].comment : comments[parentIndex]['replies'][childIndex].reply
        );
      }
    } else if (event.key === 'Enter' && event.target.value !== '') {
      if (event.key === 'Enter' && event.target.value !== '') {
        if (parentIndex === null) comments[childIndex].comment = event.target.value;
        else comments[parentIndex]['replies'][childIndex].reply = event.target.value;
        const dataToSend = {
          id: commentId,
          user_id: user_id,
          post_id: props.postId,
          post_type: props.type,
          parent_comment_id: '',
          content: event.target.value,
          comment_type: 'text',
        };
        addComment(dataToSend);
        event.target.value = '';
        setEditCommentId(null);
        setEditCommentText('');
      } else if (editCommentText === '') {
        setEditCommentText(
          parentIndex === null ? comments[childIndex].comment : comments[parentIndex]['replies'][childIndex].reply
        );
      }
    }
  };

  const handleAddReply = (event, commentId) => {
    if (event == 'event') {
      const dataToSend = {
        user_id: user_id,
        post_id: props.postId,
        post_type: props.type,
        parent_comment_id: commentId,
        content: replyTxt,
        comment_type: 'text',
      };

      addComment(dataToSend);
      setReplyTxt('');
      addReplyRef.current.value = '';
    } else if (event.key === 'Enter' && event.target.value !== '') {
      const dataToSend = {
        user_id: user_id,
        post_id: props.postId,
        post_type: props.type,
        parent_comment_id: commentId,
        content: event.target.value,
        comment_type: 'text',
      };

      addComment(dataToSend);
      event.target.value = '';
    }
  };

  const removeElementByValue = (array, element) => {
    var index = array.indexOf(element);
    if (index !== -1) array.splice(index, 1);
    return array;
  };

  const handleLike = (postId, parentIndex, index, like_icon) => {
    var temp = comments;
    var userName = first_name + ' ' + last_name;
    if (parentIndex !== null) {
      if (like_icon === 'inactive') {
        temp[parentIndex]['replies'][index].likes++;
        temp[parentIndex]['replies'][index].like_icon = 'active';
        temp[parentIndex]['replies'][index].likes_by_user_ids.push(user_id);
        temp[parentIndex]['replies'][index].likes_by_user_names.push(userName);
      } else {
        temp[parentIndex]['replies'][index].likes--;
        temp[parentIndex]['replies'][index].like_icon = 'inactive';
        temp[parentIndex]['replies'][index].likes_by_user_ids = removeElementByValue(
          temp[parentIndex]['replies'][index].likes_by_user_ids,
          user_id
        );
        temp[parentIndex]['replies'][index].likes_by_user_names = removeElementByValue(
          temp[parentIndex]['replies'][index].likes_by_user_names,
          userName
        );
      }
      console.log(temp[parentIndex]['replies'][index].likes_by_user_names);
    } else {
      if (like_icon === 'inactive') {
        temp[index].likes++;
        temp[index].like_icon = 'active';
        temp[index].likes_by_user_ids.push(user_id);
        temp[index].likes_by_user_names.push(userName);
      } else {
        temp[index].likes--;
        temp[index].like_icon = 'inactive';
        temp[index].likes_by_user_ids = removeElementByValue(temp[index].likes_by_user_ids, user_id);
        temp[index].likes_by_user_names = removeElementByValue(temp[index].likes_by_user_names, userName);
      }
    }
    setShowComments(new Set(temp));
    console.log('showComments1234', showComments);
    const dataToSend = {
      user_id: user_id,
      post_id: postId,
      post_type: 'comment',
      action: like_icon === 'inactive' ? 'add' : 'remove',
    };
    commentLike(dataToSend);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [selectedIndex, setSelectedIndex] = React.useState('');

  const handleCollapse = (index) => {
    console.warn('selectedIndex === index', selectedIndex === index, selectedIndex, index);
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <ListItem className="commentsSection" alignItems="flex-start">
      
      <ListItemAvatar>
        <AvatarStyled alt="" variant="square" src={require('../../assets/images/comment.svg')} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <TypoTitleStyled>{comments.length === 1 ? '1 Comment' : comments.length + ' Comments'}</TypoTitleStyled>
        }
        secondary={
          <>  
            <Box display="flex" className="commentSection">
              <AvatarComntStyled alt="" src={profile_image} />
              <TextFieldStyled
                inputRef={addCommentRef}
                placeholder="Add a comment..."
                onChange={(event) => setCommentTxt(event.target.value)}
                onKeyPress={(event) => handleAddComment(event)}
              />
              <IconButton
                aria-label="send"
                aria-controls="long-menu"
                aria-haspopup="true"
                disabled={commentTxt ? false : true}
                onClick={(event) => handleAddComment('event')}
              >
                <Send />
              </IconButton>
            </Box>
            {comments.map((comment, parentIndex) => (
              <>
                {comment.comment_id === editCommentId ? (
                  <Box display="flex" style={{ marginBottom: 20 }}>
                    <AvatarComntStyled alt="" src={comment.comment_user_profile_pic} />
                    <Box width={1}>
                      <EditCommentTextField
                        inputRef={editCommentRef}
                        defaultValue={comment.comment}
                        onKeyDown={(event) => handleDisableComment(event)}
                        onKeyPress={(event) => handleEditComment(event, comment.comment_id, null, parentIndex)}
                        onChange={(event) => setEditCommentText(event.target.value)}
                        // value={editcommentTxt}
                      />
                      <IconButton
                        aria-label="send"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={() => handleEditComment('event', comment.comment_id, null, parentIndex)}
                      >
                        <Send />
                      </IconButton>
                      {/* <Box component="span">Press Enter to save, Esc to cancel.</Box> */}
                    </Box>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="space-between" style={{ marginTop: 20 }}>
                    <Box display="flex">
                      <AvatarComntStyled alt="" src={comment.comment_user_profile_pic} />
                      <Box>
                        <TypoCmntName>
                          

                          {comment.comment_user_name}
                          <Box component="span"> {comment.comment_created_at}</Box>
                        </TypoCmntName>
                        <TypoCmntTxt>{comment.comment}</TypoCmntTxt>
                        {comment.likes_by_user_ids.length ? (
                          <Tooltip title={comment.likes_by_user_names.join(', ')} arrow placement="left">
                            <ButtonStyled
                              startIcon={<ThumbUp color={comment.like_icon === 'active' ? 'primary' : 'default'} />}
                              onClick={() => handleLike(comment.comment_id, null, parentIndex, comment.like_icon)}
                            >
                              {comment.likes}
                            </ButtonStyled>
                          </Tooltip>
                        ) : (
                          <ButtonStyled
                            startIcon={<ThumbUp color={comment.like_icon === 'active' ? 'primary' : 'default'} />}
                            onClick={() => handleLike(comment.comment_id, null, parentIndex, comment.like_icon)}
                          >
                            {comment.likes}
                          </ButtonStyled>
                        )}
                        <ButtonStyled
                          onClick={() => {
                            handleCollapse(parentIndex);
                          }}
                          startIcon={<Message color="primary" />}
                        >
                          {comment.replies.length
                            ? comment.replies.length > 1
                              ? comment.replies.length + ' Replies'
                              : '1 Reply'
                            : 'Reply'}
                        </ButtonStyled>
                      </Box>
                    </Box>
                    { !props.Hide && <Box style={{ position: 'relative' }}>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) =>
                          handleClick(event, null, parentIndex, comment.comment_id, comment.comment_user_id)
                        }
                      >
                        <MoreVert />
                      </IconButton>
                    </Box> }
                  </Box>
                )}
                <Collapse in={parentIndex === selectedIndex} timeout="auto" unmountOnExit>
                  <Box style={{ marginLeft: 183, marginTop: 20 }}>
                    <Box display="flex">
                      <AvatarComntStyled alt="" src={profile_image} />
                      <TextFieldStyled
                        inputRef={addReplyRef}
                        placeholder="Add a reply..."
                        onKeyPress={(event) => handleAddReply(event, comment.comment_id)}
                        onChange={(event) => setReplyTxt(event.target.value)}
                        // value={replyTxt}
                      />
                      <IconButton
                        aria-label="send"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleAddReply('event', comment.comment_id)}
                      >
                        <Send />
                      </IconButton>
                    </Box>
                  </Box>

                  {comment.replies.map((reply, index, { length }) => (
                    <>
                      {reply.reply_id === editCommentId ? (
                        <Box display="flex" style={{ marginLeft: 130, marginBottom: 20 }}>
                          <AvatarComntStyled alt="" src={profile_image} />
                          <Box width={1} display="flex">
                            <EditCommentTextField
                              inputRef={editCommentRef}
                              defaultValue={reply.reply}
                              onKeyDown={(event) => handleDisableComment(event)}
                              onChange={(event) => setEditCommentText(event.target.value)}
                              onKeyPress={(event) => handleEditComment(event, reply.reply_id, parentIndex, index)}
                            />
                            <IconButton
                              aria-label="send"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={() => handleEditComment('event', reply.reply_id, parentIndex, index)}
                            >
                              <Send />
                            </IconButton>
                            {/* <Box component="span">Press Enter to save, Esc to cancel.</Box> */}
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          className="mt-20"
                          style={{ marginLeft: 183 }}
                        >
                          <Box display="flex">
                            <AvatarComntStyled alt="" src={reply.reply_user_profile_pic} />
                            <Box>
                              <TypoCmntName>
                                {reply.reply_user_name}
                                <Box component="span"> {reply.reply_created_at}</Box>
                              </TypoCmntName>
                              <TypoCmntTxt>{reply.reply}</TypoCmntTxt>
                              {reply.likes_by_user_ids.length ? (
                                <Tooltip title={reply.likes_by_user_names.join(', ')} arrow placement="left">
                                  <ButtonStyled
                                    startIcon={<ThumbUp color={reply.like_icon === 'active' ? 'primary' : 'default'} />}
                                    onClick={() => handleLike(reply.reply_id, parentIndex, index, reply.like_icon)}
                                  >
                                    {reply.likes}
                                  </ButtonStyled>
                                </Tooltip>
                              ) : (
                                <ButtonStyled
                                  startIcon={<ThumbUp color={reply.like_icon === 'active' ? 'primary' : 'default'} />}
                                  onClick={() => handleLike(reply.reply_id, parentIndex, index, reply.like_icon)}
                                >
                                  {reply.likes}
                                </ButtonStyled>
                              )}
                            </Box>
                          </Box>
                          <Box style={{ position: 'relative' }}>
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={(event) =>
                                handleClick(event, parentIndex, index, reply.reply_id, reply.reply_user_id)
                              }
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </>
                  ))}
                </Collapse>
              </>
            ))}

            <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
              {commentOptions.actions.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={() => handleCommentAction(option, commentOptions)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
    </ListItem>
  );
};

const mapStateToProps = (state) => {
  
  return {
    // comments: state.comment.comments.reverse(),
    comments: state.comment.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (data) => dispatch(getComments(data)),
    addComment: (data) => dispatch(addComment(data)),
    commentLike: (data) => dispatch(commentLike(data)),
    commentDelete: (data) => dispatch(commentDelete(data)),
  };
};

Comments.propTypes = {
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
  commentLike: PropTypes.func.isRequired,
  commentDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Comments));
