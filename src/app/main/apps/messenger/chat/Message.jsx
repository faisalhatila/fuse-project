import React, { useEffect, useState } from 'react';
import { lighten, styled } from '@mui/material/styles';
import { Button, Modal, Typography, Box } from '@mui/material';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import clsx from 'clsx';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AnimatePresence, motion } from 'framer-motion';
import ItemIcon from '../../file-manager/ItemIcon';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import moment from 'moment';

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

const Message = ({ chat, item, i, user }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  useEffect(() => {
    if (!!item?.files?.length) {
      // console.log({ files: item?.files });
    }
  }, [item]);
  function isFirstMessageOfGroup(item, i) {
    return i === 0 || (chat[i - 1] && chat[i - 1].contactId !== item.contactId);
  }

  function isLastMessageOfGroup(item, i) {
    return (
      i === chat.length - 1 ||
      (chat[i + 1] && chat[i + 1].contactId !== item.contactId)
    );
  }

  const itemsToRender =
    item?.files?.length > 3 ? item?.files?.slice(0, 3) : item?.files;
  const handleCloseModal = () => {
    setModalItems([]);
    setIsOpenModal(false);
  };
  const formatFileSize = (size) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };
  return (
    <>
      <StyledMessageRow
        className={clsx(
          'flex flex-col grow-0 shrink-0 items-start justify-end relative px-16 pb-4',
          item.contactId === user.id ? 'me' : 'contact',
          {
            'first-of-group': isFirstMessageOfGroup(item, i),
          },
          { 'last-of-group': isLastMessageOfGroup(item, i) },
          i + 1 === chat.length && 'pb-72'
        )}
      >
        <div className="bubble flex flex-col-reverse relative justify-center px-12 py-8 max-w-full">
          <Typography className=" whitespace-pre-wrap text-md">
            {item.value}
          </Typography>
          {!!item?.files?.length && (
            <div
              onClick={() => {
                setModalItems(item?.files);
                setIsOpenModal(true);
              }}
              className="grid grid-cols-2 gap-4 mb-5"
            >
              {itemsToRender?.map((file) => (
                <div className="bg-[rgba(0,0,0,0.6)] p-3 w-[100px] h-[100px] flex items-center justify-center rounded">
                  <img
                    // src={URL.createObjectURL(selectedFiles[0].file)}
                    // src={file?.base64}
                    src={
                      file.type === 'application/pdf'
                        ? '/assets/icons/png-pdf-file-icon-8.png'
                        : file.type ===
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                          ? '/assets/icons/docs.png'
                          : file.type === 'text/plain'
                            ? '/assets/icons/text.png'
                            : file?.base64
                    }
                    alt="Preview"
                    className="max-w-[80%]"
                  />
                </div>
              ))}
              {item?.files?.length > 3 && (
                <div className="bg-[rgba(0,0,0,0.6)] p-3 w-[100px] h-[100px] flex items-center justify-center rounded">
                  <Typography className="text-4xl">{`${item?.files?.length - 3} +`}</Typography>
                </div>
              )}
            </div>
          )}

          <Typography
            className="time absolute hidden w-full text-sm -mb-20 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
            color="text.secondary"
          >
            {formatDistanceToNow(new Date(item.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </div>
      </StyledMessageRow>
      <AnimatePresence>
        {isOpenModal && modalItems?.length && (
          <motion.div
            initial={{ x: 300, opacity: 0 }} // Start off-screen to the right
            animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }} // Slide in faster (duration: 0.3s)
            exit={{ x: 300, opacity: 0, transition: { duration: 0.2 } }} // Slide out to the right, faster exit (duration: 0.2s)
            className="file-details p-24 sm:p-32 fixed top-[128px] right-[70px] bg-white overflow-y-auto max-w-[400px]"
            style={{
              minHeight: 'calc(100vh - 261px)',
              maxHeight: 'calc(100vh - 261px)',
            }}
          >
            <div className="flex items-center justify-end w-full">
              <IconButton onClick={handleCloseModal}>
                <FuseSvgIcon>heroicons-outline:x-mark</FuseSvgIcon>
              </IconButton>
            </div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              style={{
                '--swiper-pagination-color': '#EF5350',
                '--swiper-navigation-color': '#EF5350',
              }}
            >
              {modalItems?.map((file) => (
                <SwiperSlide>
                  <Box
                    className=" w-full rounded-lg border preview h-128 sm:h-256 file-icon flex items-center justify-center my-32"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? lighten(theme.palette.background.default, 0.4)
                          : lighten(theme.palette.background.default, 0.02),
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, transition: { delay: 0.3 } }}
                      className="flex items-center justify-center"
                    >
                      {/* <ItemIcon type={'XLS'} /> */}
                      <img
                        src={
                          file.type === 'application/pdf'
                            ? '/assets/icons/png-pdf-file-icon-8.png'
                            : file.type ===
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                              ? '/assets/icons/docs.png'
                              : file.type === 'text/plain'
                                ? '/assets/icons/text.png'
                                : file?.base64
                        }
                        // src={'/assets/icons/docs.png'}
                        alt="Preview"
                        className="max-w-[60%]"
                      />
                    </motion.div>
                  </Box>

                  <Typography className="text-17 font-medium">
                    {file.name}
                  </Typography>

                  <div className="text-15 font-medium mt-32">Information</div>
                  <div className="flex flex-col mt-16 border-t border-b divide-y font-medium">
                    <div className="flex items-center justify-between py-12">
                      <Typography color="text.secondary">Created By</Typography>
                      <Typography>{'You'}</Typography>
                    </div>
                    <div className="flex items-center justify-between py-12">
                      <Typography color="text.secondary">Created At</Typography>
                      <Typography>
                        {moment().format('MM.DD.YYYY hh:mm A')}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-between py-12">
                      <Typography color="text.secondary">
                        Modified At
                      </Typography>
                      <Typography>
                        {moment().format('MM.DD.YYYY hh:mm A')}
                      </Typography>
                    </div>
                    <div className="flex items-center justify-between py-12">
                      <Typography color="text.secondary">Size</Typography>
                      <Typography>{formatFileSize(file.size)}</Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-16 w-full mt-32">
                    <Button
                      className="flex-auto"
                      color="secondary"
                      variant="contained"
                    >
                      Download
                    </Button>
                    <Button className="flex-auto">Delete</Button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Message;
