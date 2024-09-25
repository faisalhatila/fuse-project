import { lighten, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useContext, useEffect, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserAvatar from '../UserAvatar';
import ChatMoreMenu from './ChatMoreMenu';
import { ChatAppContext } from '../MessengerApp';
import Error404Page from '../../../404/Error404Page';
import {
  useGetMessengerChatQuery,
  useGetMessengerContactQuery,
  useGetMessengerUserProfileQuery,
  useSendMessengerMessageMutation,
} from '../MessengerApi';
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';
import UploadedFilePreview2 from './UploadedFilePreview2';
import Message from './Message';
import './chat.css';

const StyledMessageRow = styled('div')(({ theme }) => ({
  '&.contact': {
    '& .bubble': {
      backgroundColor: lighten(theme.palette.secondary.main, 0.1),
      color: theme.palette.secondary.contrastText,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      '& .time': {
        paddingLeft: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 12,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 12,
      },
    },
  },
  '&.me': {
    paddingLeft: 36,
    '& .bubble': {
      marginLeft: 'auto',
      backgroundColor: lighten(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.contrastText,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      '& .time': {
        justifyContent: 'flex-end',
        right: 0,
        paddingRight: 12,
      },
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopRightRadius: 12,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomRightRadius: 12,
      },
    },
  },
  '&.contact + .me, &.me + .contact': {
    paddingTop: 20,
    marginTop: 20,
  },
  '&.first-of-group': {
    '& .bubble': {
      borderTopLeftRadius: 12,
      paddingTop: 8,
    },
  },
  '&.last-of-group': {
    '& .bubble': {
      borderBottomLeftRadius: 12,
      paddingBottom: 8,
      '& .time': {
        display: 'flex',
      },
    },
  },
}));

/**
 * The Chat App.
 */
function Chat(props) {
  const { className } = props;
  const { setMainSidebarOpen, setContactSidebarOpen } =
    useContext(ChatAppContext);
  const chatRef = useRef(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadMenuAnchorEl, setUploadMenuAnchorEl] = useState(null);
  const routeParams = useParams();
  const contactId = routeParams.id;
  const { data: user } = useGetMessengerUserProfileQuery();
  const { data: chat } = useGetMessengerChatQuery(contactId, {
    skip: !contactId,
  });
  const { data: selectedContact } = useGetMessengerContactQuery(contactId, {
    skip: !contactId,
  });
  const [sendMessage] = useSendMessengerMessageMutation();
  useEffect(() => {
    if (chat) {
      setTimeout(scrollToBottom);
    }
  }, [chat]);
  useEffect(() => {
    // setChatMessages(chat);
  }, [chat]);

  function scrollToBottom() {
    if (!chatRef.current) {
      return;
    }

    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  function onInputChange(ev) {
    setMessage(ev.target.value);
  }

  async function onMessageSubmit(ev) {
    ev.preventDefault();

    if (message === '') {
      return;
    }

    await sendMessage({
      message,
      // files: selectedFiles,
      files: selectedFiles.map((fileData) => fileData.file),
      contactId,
    });
    setMessage('');
    setSelectedFiles([]);
  }

  if (!user || !chat || !selectedContact) {
    return <Error404Page />;
  }

  // Function to handle opening the upload menu
  const handleUploadMenuOpen = (event) => {
    setUploadMenuAnchorEl(event.currentTarget);
  };

  // Function to handle closing the upload menu
  const handleUploadMenuClose = () => {
    setUploadMenuAnchorEl(null);
  };

  const handleFileSelect = (fileType) => {
    fileInputRef.current.accept = fileType;
    fileInputRef.current.click();
    handleUploadMenuClose();
  };

  const handleFileChange = (event) => {
    const { files } = event.target;

    const tempFiles = Array.from(files).map((item) => ({
      file: item,
      id: uuidv4(),
    }));

    console.log({ files, tempFiles });

    setSelectedFiles((prevFiles) => [...prevFiles, ...tempFiles]);
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <Box
        className="w-full border-b-1"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.02),
        }}
      >
        <Toolbar className="flex items-center justify-between px-16 w-full">
          <div className="flex items-center">
            <IconButton
              aria-label="Open drawer"
              onClick={() => setMainSidebarOpen(true)}
              className="border border-divider flex lg:hidden"
            >
              <FuseSvgIcon>
                heroicons-outline:chat-bubble-left-right
              </FuseSvgIcon>
            </IconButton>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setContactSidebarOpen(true);
              }}
              onKeyDown={() => setContactSidebarOpen(true)}
              role="button"
              tabIndex={0}
            >
              <UserAvatar className="relative mx-8" user={selectedContact} />
              <Typography
                color="inherit"
                className="text-15 font-semibold px-4"
              >
                {selectedContact.name}
              </Typography>
            </div>
          </div>
          <ChatMoreMenu className="-mx-8" />
        </Toolbar>
      </Box>

      <div className="flex flex-auto h-full min-h-0 w-full">
        <div className={clsx('flex flex-1 z-10 flex-col relative', className)}>
          <>
            <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
              {chat?.length > 0 && (
                <div className="flex flex-col pt-16 px-16 pb-40">
                  {chat.map((item, i) => {
                    item.files;
                    return (
                      // <StyledMessageRow
                      //   key={i}
                      //   className={clsx(
                      //     'flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4',
                      //     item.contactId === user.id ? 'me' : 'contact',
                      //     {
                      //       'first-of-group': isFirstMessageOfGroup(item, i),
                      //     },
                      //     { 'last-of-group': isLastMessageOfGroup(item, i) },
                      //     i + 1 === chat.length && 'pb-72'
                      //   )}
                      // >
                      //   <div className="bubble flex relative items-center justify-center px-12 py-8 max-w-full">
                      //     <Typography className=" whitespace-pre-wrap text-md">
                      //       {item.value}
                      //     </Typography>
                      //     {!!item?.files?.length &&
                      //       console.log({ file: item?.files[0] })}
                      //     {!!item?.files?.length && (
                      //       <img
                      //         // src={URL.createObjectURL(selectedFiles[0].file)}
                      //         src={URL.createObjectURL(item?.files[0])}
                      //         alt="Preview"
                      //         className="w-[100px]"
                      //       />
                      //     )}

                      //     <Typography
                      //       className="time absolute hidden w-full text-sm -mb-20 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
                      //       color="text.secondary"
                      //     >
                      //       {formatDistanceToNow(new Date(item.createdAt), {
                      //         addSuffix: true,
                      //       })}
                      //     </Typography>
                      //   </div>
                      // </StyledMessageRow>
                      <Message
                        chat={chat}
                        item={item}
                        user={user}
                        i={i}
                        key={i}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {chat && (
              <Paper
                square
                component="form"
                onSubmit={onMessageSubmit}
                className="absolute border-t-1 bottom-0 right-0 left-0 py-16 px-16"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
              >
                <div className="flex items-end relative">
                  <IconButton
                    onClick={() => setIsOpenEmoji(true)}
                    type="submit"
                  >
                    <FuseSvgIcon className="text-3xl" color="action">
                      heroicons-outline:face-smile
                    </FuseSvgIcon>
                  </IconButton>
                  <EmojiPicker
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                    }}
                    className="absolute left-[0px]"
                    open={isOpenEmoji}
                    onEmojiClick={(emoji) => {
                      console.log({ emoji });
                      setIsOpenEmoji(false);
                    }}
                    suggestedEmojisMode={false}
                  />

                  <IconButton onClick={handleUploadMenuOpen}>
                    <FuseSvgIcon className="text-3xl" color="action">
                      heroicons-outline:paper-clip
                    </FuseSvgIcon>
                  </IconButton>
                  <Menu
                    anchorEl={uploadMenuAnchorEl}
                    open={Boolean(uploadMenuAnchorEl)}
                    onClose={handleUploadMenuClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                  >
                    <MenuItem onClick={() => handleFileSelect('image/*')}>
                      Upload Image
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleFileSelect('application/pdf')}
                    >
                      Upload PDF
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleFileSelect('.doc,.docx,.txt')}
                    >
                      Upload Docs
                    </MenuItem>
                  </Menu>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple={true}
                  />
                  <div className="w-[100%]">
                    {selectedFile && (
                      <div className="mx-8 mb-10 rounded relative flex gap-[10px]">
                        {!!selectedFiles.length &&
                          selectedFiles.map((item, index) => (
                            <UploadedFilePreview2
                              selectedFile={item.file}
                              url={item.url}
                              key={index}
                              id={item.id}
                              setSelectedFiles={setSelectedFiles}
                              selectedFiles={selectedFiles}
                            />
                          ))}
                      </div>
                    )}
                    <InputBase
                      autoFocus={false}
                      id="message-input"
                      className="flex-1 flex grow shrink-0 mx-8 border-2"
                      placeholder="Type your message"
                      onChange={onInputChange}
                      value={message}
                      sx={{ backgroundColor: 'background.paper' }}
                    />
                  </div>
                  <IconButton type="submit">
                    <FuseSvgIcon color="action">
                      heroicons-outline:paper-airplane
                    </FuseSvgIcon>
                  </IconButton>
                </div>
              </Paper>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default Chat;
