import FuseUtils from '@fuse/utils';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { lighten } from '@mui/material/styles';
import ContactListItem from './ContactListItem';
import UserAvatar from '../../UserAvatar';
import MainSidebarMoreMenu from './MainSidebarMoreMenu';
import { ChatAppContext } from '../../MessengerApp';
import ChatListItem from './ChatListItem';
import {
  useGetMessengerChatsQuery,
  useGetMessengerContactsQuery,
  useGetMessengerUserProfileQuery,
} from '../../MessengerApi';

/**
 * The main sidebar.
 */
function MainSidebar() {
  const { setUserSidebarOpen } = useContext(ChatAppContext);
  const { data: contacts } = useGetMessengerContactsQuery();
  const { data: user } = useGetMessengerUserProfileQuery();
  const { data: chats } = useGetMessengerChatsQuery();
  const [searchText, setSearchText] = useState('');

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <div className="flex flex-col flex-auto">
      <Box
        className="py-16 px-24 border-b-1 flex flex-col flex-shrink-0 sticky top-0 z-10"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.02),
        }}
      >
        <div className="flex justify-between items-center mb-16">
          {user && (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setUserSidebarOpen(true)}
              onKeyDown={() => setUserSidebarOpen(true)}
              role="button"
              tabIndex={0}
            >
              <UserAvatar className="relative" user={user} />
              <Typography className="mx-16 font-medium">
                {user?.name}
              </Typography>
            </div>
          )}

          <MainSidebarMoreMenu className="-mx-16" />
        </div>

        {useMemo(
          () => (
            <Paper className="flex p-4 items-center w-full px-8 py-4 border-1 rounded-lg h-36 shadow-none">
              <FuseSvgIcon color="action">
                heroicons-solid:magnifying-glass
              </FuseSvgIcon>

              <Input
                placeholder="Search or start new chat"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={handleSearchText}
              />
            </Paper>
          ),
          [searchText]
        )}
      </Box>

      <div className="flex-auto">
        <List className="w-full">
          {useMemo(() => {
            if (!contacts || !chats) {
              return null;
            }

            function getFilteredArray(arr, _searchText) {
              if (_searchText.length === 0) {
                return arr;
              }

              return FuseUtils.filterArrayByString(arr, _searchText);
            }

            const chatListContacts =
              contacts?.length > 0 && chats?.length > 0
                ? chats.map((_chat) => ({
                    ..._chat,
                    ...contacts.find(
                      (_contact) => _contact.id === _chat.contactId
                    ),
                  }))
                : [];
            const filteredContacts = getFilteredArray(
              [...contacts],
              searchText
            );
            const filteredChatList = getFilteredArray(
              [...chatListContacts],
              searchText
            );
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.02,
                },
              },
            };
            const item = {
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            };

            const channels = [
              {
                id: '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf2',
                contactId: '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf2',
                unreadCount: 2,
                muted: false,
                lastMessage: 'See you tomorrow!',
                lastMessageAt: '2022-01-05T15:56:48.732Z',
                avatar: 'assets/images/avatars/male-02.jpg',
                name: '@Project 1',
                about: "Hi there! I'm using FuseChat.",
                status: 'away',
                details: {
                  emails: [
                    {
                      email: 'bernardlangley@mail.com',
                      label: 'Personal',
                    },
                    {
                      email: 'langley.bernard@boilcat.name',
                      label: 'Work',
                    },
                  ],
                  phoneNumbers: [
                    {
                      country: 'md',
                      phoneNumber: '893 548 2862',
                      label: 'Mobile',
                    },
                  ],
                  title: 'Electromedical Equipment Technician',
                  company: 'Boilcat',
                  birthday: '1988-05-26T12:00:00.000Z',
                  address: '943 Adler Place, Hamilton, South Dakota, PO5592',
                },
                attachments: {
                  media: [
                    'assets/images/cards/01-320x200.jpg',
                    'assets/images/cards/02-320x200.jpg',
                    'assets/images/cards/03-320x200.jpg',
                    'assets/images/cards/04-320x200.jpg',
                    'assets/images/cards/05-320x200.jpg',
                    'assets/images/cards/06-320x200.jpg',
                    'assets/images/cards/07-320x200.jpg',
                    'assets/images/cards/08-320x200.jpg',
                  ],
                  docs: [],
                  links: [],
                },
              },
              {
                id: '16b9e696-ea95-4dd8-86c4-3caf705a1dc6',
                contactId: '16b9e696-ea95-4dd8-86c4-3caf705a1dc6',
                unreadCount: 0,
                muted: false,
                lastMessage: 'See you tomorrow!',
                lastMessageAt: '2022-01-05T15:56:48.732Z',
                avatar: 'assets/images/avatars/male-12.jpg',
                name: '@Project 2',
                about: "Hi there! I'm using FuseChat.",
                status: 'offline',
                details: {
                  emails: [
                    {
                      email: 'nunezfaulkner@mail.tv',
                      label: 'Personal',
                    },
                  ],
                  phoneNumbers: [
                    {
                      country: 'xk',
                      phoneNumber: '909 552 3327',
                      label: 'Mobile',
                    },
                  ],
                  title: 'Hotel Manager',
                  company: 'Buzzopia',
                  birthday: '1982-01-23T12:00:00.000Z',
                  address: '614 Herkimer Court, Darrtown, Nebraska, PO9308',
                },
                attachments: {
                  media: [
                    'assets/images/cards/01-320x200.jpg',
                    'assets/images/cards/02-320x200.jpg',
                    'assets/images/cards/03-320x200.jpg',
                    'assets/images/cards/04-320x200.jpg',
                    'assets/images/cards/05-320x200.jpg',
                    'assets/images/cards/06-320x200.jpg',
                    'assets/images/cards/07-320x200.jpg',
                    'assets/images/cards/08-320x200.jpg',
                  ],
                  docs: [],
                  links: [],
                },
              },
              {
                id: 'bf172879-423a-4fd6-8df3-6d1938bbfe1f',
                contactId: 'bf172879-423a-4fd6-8df3-6d1938bbfe1f',
                unreadCount: 1,
                muted: false,
                lastMessage: 'See you tomorrow!',
                lastMessageAt: '2022-01-05T15:56:48.732Z',
                avatar: 'assets/images/avatars/male-06.jpg',
                name: '@Project 3',
                about: "Hi there! I'm using FuseChat.",
                status: 'online',
                details: {
                  emails: [
                    {
                      email: 'edwardsmckenzie@mail.org',
                      label: 'Personal',
                    },
                    {
                      email: 'mckenzie.edwards@bugsall.io',
                      label: 'Work',
                    },
                  ],
                  phoneNumbers: [
                    {
                      country: 'pe',
                      phoneNumber: '934 519 2903',
                      label: 'Mobile',
                    },
                    {
                      country: 'pe',
                      phoneNumber: '989 489 3662',
                      label: 'Work',
                    },
                    {
                      country: 'pe',
                      phoneNumber: '813 461 2790',
                      label: 'Home',
                    },
                  ],
                  title: 'Legal Assistant',
                  company: 'Bugsall',
                  birthday: '1988-07-27T12:00:00.000Z',
                  address: '384 Polhemus Place, Dalton, Palau, PO6038',
                },
                attachments: {
                  media: [
                    'assets/images/cards/01-320x200.jpg',
                    'assets/images/cards/02-320x200.jpg',
                    'assets/images/cards/03-320x200.jpg',
                    'assets/images/cards/04-320x200.jpg',
                    'assets/images/cards/05-320x200.jpg',
                    'assets/images/cards/06-320x200.jpg',
                    'assets/images/cards/07-320x200.jpg',
                    'assets/images/cards/08-320x200.jpg',
                  ],
                  docs: [],
                  links: [],
                },
              },
              {
                id: 'abd9e78b-9e96-428f-b3ff-4d934c401bee',
                contactId: 'abd9e78b-9e96-428f-b3ff-4d934c401bee',
                unreadCount: 0,
                muted: true,
                lastMessage: 'See you tomorrow!',
                lastMessageAt: '2022-01-05T15:56:48.732Z',
                avatar: 'assets/images/avatars/female-04.jpg',
                name: '@Project 4',
                about: "Hi there! I'm using FuseChat.",
                status: 'online',
                details: {
                  emails: [
                    {
                      email: 'elsiemelendez@mail.com',
                      label: 'Personal',
                    },
                    {
                      email: 'melendez.elsie@chillium.name',
                      label: 'Work',
                    },
                  ],
                  phoneNumbers: [
                    {
                      country: 'tg',
                      phoneNumber: '907 515 3007',
                      label: 'Mobile',
                    },
                    {
                      country: 'tg',
                      phoneNumber: '967 534 2803',
                      label: 'Work',
                    },
                  ],
                  title: 'Fundraising Director',
                  company: 'Chillium',
                  birthday: '1980-06-28T12:00:00.000Z',
                  address: '428 Varanda Place, Veyo, Oklahoma, PO6188',
                },
                attachments: {
                  media: [
                    'assets/images/cards/01-320x200.jpg',
                    'assets/images/cards/02-320x200.jpg',
                    'assets/images/cards/03-320x200.jpg',
                    'assets/images/cards/04-320x200.jpg',
                    'assets/images/cards/05-320x200.jpg',
                    'assets/images/cards/06-320x200.jpg',
                    'assets/images/cards/07-320x200.jpg',
                    'assets/images/cards/08-320x200.jpg',
                  ],
                  docs: [],
                  links: [],
                },
              },
              {
                id: '6519600a-5eaa-45f8-8bed-c46fddb3b26a',
                contactId: '6519600a-5eaa-45f8-8bed-c46fddb3b26a',
                unreadCount: 0,
                muted: false,
                lastMessage: 'See you tomorrow!',
                lastMessageAt: '2022-01-05T15:56:48.732Z',
                background: 'assets/images/cards/24-640x480.jpg',
                name: '@Project 5',
                about: "Hi there! I'm using FuseChat.",
                status: 'online',
                details: {
                  emails: [
                    {
                      email: 'mcleodwagner@mail.biz',
                      label: 'Personal',
                    },
                  ],
                  phoneNumbers: [
                    {
                      country: 'at',
                      phoneNumber: '977 590 2773',
                      label: 'Mobile',
                    },
                    {
                      country: 'at',
                      phoneNumber: '828 496 3813',
                      label: 'Work',
                    },
                    {
                      country: 'at',
                      phoneNumber: '831 432 2512',
                      label: 'Home',
                    },
                  ],
                  company: 'Inrt',
                  birthday: '1980-12-03T12:00:00.000Z',
                  address: '736 Glen Street, Kaka, West Virginia, PO9350',
                },
                attachments: {
                  media: [
                    'assets/images/cards/01-320x200.jpg',
                    'assets/images/cards/02-320x200.jpg',
                    'assets/images/cards/03-320x200.jpg',
                    'assets/images/cards/04-320x200.jpg',
                    'assets/images/cards/05-320x200.jpg',
                    'assets/images/cards/06-320x200.jpg',
                    'assets/images/cards/07-320x200.jpg',
                    'assets/images/cards/08-320x200.jpg',
                  ],
                  docs: [],
                  links: [],
                },
              },
            ];
            return (
              <motion.div
                className="flex flex-col shrink-0"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {channels.length > 0 && (
                  <motion.div variants={item}>
                    <Typography
                      className="font-medium text-2xl px-24 pt-16"
                      color="secondary.main"
                    >
                      Projects
                    </Typography>
                  </motion.div>
                )}

                {channels.map((chat, index) => (
                  <motion.div variants={item} key={chat.id}>
                    <div
                      className={clsx(
                        filteredChatList.length !== index + 1 && 'border-b-1'
                      )}
                    >
                      <ChatListItem projects item={chat} />
                    </div>
                  </motion.div>
                ))}
                {filteredChatList.length > 0 && (
                  <motion.div variants={item}>
                    <Typography
                      className="font-medium text-2xl px-24 pt-16"
                      color="secondary.main"
                    >
                      Chats
                    </Typography>
                  </motion.div>
                )}

                {filteredChatList.map((chat, index) => (
                  <motion.div variants={item} key={chat.id}>
                    <div
                      className={clsx(
                        filteredChatList.length !== index + 1 && 'border-b-1'
                      )}
                    >
                      <ChatListItem item={chat} />
                    </div>
                  </motion.div>
                ))}

                {filteredContacts.length > 0 && (
                  <motion.div variants={item}>
                    <Typography
                      className="font-medium text-2xl px-24 pt-16"
                      color="secondary.main"
                    >
                      Contacts
                    </Typography>
                  </motion.div>
                )}

                {filteredContacts.map((contact, index) => (
                  <motion.div variants={item} key={contact.id}>
                    <div
                      className={clsx(
                        filteredContacts.length !== index + 1 && 'border-b-1'
                      )}
                    >
                      <ContactListItem item={contact} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            );
          }, [contacts, chats, searchText])}
        </List>
      </div>
    </div>
  );
}

export default MainSidebar;
