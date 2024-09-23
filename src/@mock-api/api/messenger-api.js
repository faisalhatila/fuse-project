import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';

const contactsDB = mockApi.components.examples.chat_contacts.value;
let userDB = mockApi.components.examples.chat_profile.value;
const userChatListDB = mockApi.components.examples.chat_chats.value;
const messages = mockApi.components.examples.chat_messages.value;
const chatsDB = userChatListDB.map((chat) => ({
	...chat,
	messages: messages.map((message) => ({
		...message,
		contactId: message.contactId === '' ? chat.contactId : userDB.id
	}))
}));
export const messengerApiMocks = (mock) => {
	mock.onGet('/messenger/contacts').reply(() => {
		return [200, contactsDB];
	});
	mock.onGet('/messenger/contacts/:contactId').reply((config) => {
		const { contactId } = config.params;
		const contact = _.find(contactsDB, { id: contactId });

		if (!contact) {
			return [404, 'Requested data do not exist.'];
		}

		return [200, contact];
	});
	mock.onGet('/messenger/chats').reply(() => {
		userChatListDB.sort((d1, d2) => new Date(d2.lastMessageAt).getTime() - new Date(d1.lastMessageAt).getTime());
		return [200, userChatListDB];
	});
	mock.onGet('/messenger/chats/:contactId').reply((config) => {
		const { contactId } = config.params;
		const contact = _.find(contactsDB, { id: contactId });

		if (!contact) {
			return [404, 'Requested data do not exist.'];
		}

		const chat = _.find(chatsDB, { contactId })?.messages;

		if (chat) {
			return [200, chat];
		}

		return [200, []];
	});
	mock.onPost('/messenger/chats/:contactId').reply(async (config) => {
		const { contactId } = config.params;
		const contact = _.find(contactsDB, { id: contactId });

		if (!contact) {
			return [404, 'Requested data do not exist.'];
		}

		// Parse FormData from config.data
		const formData = config.data instanceof FormData ? config.data : new FormData();

		let message = '';
		let files = [];

		// Iterate through FormData
		formData.forEach((value, key) => {
			if (key.startsWith('file')) {
				files.push(value); // Collect files
			} else if (key === 'message') {
				message = value; // Collect message text
			}
		});

		// If the contact chat doesn't exist, create it
		const contactChat = _.find(chatsDB, { contactId });

		if (!contactChat) {
			createNewChat(contactId);
		}

		const newMessage = await createNewMessage({ message, files }, contactId);
		return [200, newMessage];
	});
	mock.onGet('/messenger/profile').reply(() => {
		return [200, userDB];
	});
	mock.onPut('/messenger/profile').reply(({ data }) => {
		const userData = JSON.parse(data);
		userDB = _.merge({}, userDB, userData);
		return [200, userDB];
	});

	const fileToBase64 = async (file) => {
		return await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};
	async function createNewMessage({ message, files }, contactId) {
		const base64Files = await Promise.all(files.map(fileToBase64));
		const newMessage = {
			id: FuseUtils.generateGUID(),
			contactId: userDB.id,
			value: message,
			files: base64Files.map((base64, index) => ({
				base64,
				name: files[index].name || 'Unnamed file',
				size: files[index].size || 0,
				type: files[index].type || 'application/octet-stream',
			})),
			createdAt: new Date().toISOString(),
			chatId: ''
		};
		const selectedChat = _.find(chatsDB, { contactId });
		const userSelectedChat = _.find(userChatListDB, { contactId });
		selectedChat.messages.push(newMessage);
		selectedChat.lastMessage = message || (files.length ? 'Sent a file' : '');
		selectedChat.lastMessageAt = newMessage.createdAt;

		userSelectedChat.lastMessage = message || (files.length ? 'Sent a file' : '');
		userSelectedChat.lastMessageAt = newMessage.createdAt;
		return await newMessage;
	}

	function createNewChat(contactId) {
		const newChat = {
			id: FuseUtils.generateGUID(),
			contactId,
			unreadCount: 0,
			muted: false,
			lastMessage: '',
			lastMessageAt: ''
		};
		userChatListDB.push(newChat);
		const newMessageData = {
			...newChat,
			messages: []
		};
		chatsDB.push(newMessageData);
		return newMessageData;
	}
};
