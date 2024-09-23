import React, { useEffect, useState } from 'react';
import { lighten, styled } from '@mui/material/styles';
import { Button, Modal, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import clsx from 'clsx';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
      console.log({ files: item?.files });
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
                console.log({ files: item?.files });
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
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        className="flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
      >
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          style={{
            '--swiper-pagination-color': '#fff',
            '--swiper-navigation-color': '#fff',
          }}
        >
          {modalItems?.map((file) => (
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <div className="w-[450px] relative min-h-[450px] bg-white rounded flex justify-center items-center flex-col ">
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
                  <Button
                    variant="contained"
                    className="mt-16 absolute bottom-10"
                    color="secondary"
                    onClick={handleCloseModal}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
};

export default Message;
