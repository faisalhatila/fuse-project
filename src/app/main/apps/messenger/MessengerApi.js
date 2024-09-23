import { apiService as api } from 'app/store/apiService';

export const addTagTypes = [
	'messenger_contacts',
	'messenger_contact',
	'messenger_chats',
	'messenger_chat',
	'messenger_user_profile'
];
const MessengerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getMessengerContacts: build.query({
				query: () => ({ url: `/mock-api/messenger/contacts` }),
				providesTags: ['messenger_contacts']
			}),
			getMessengerContact: build.query({
				query: (queryArg) => ({ url: `/mock-api/messenger/contacts/${queryArg}` }),
				providesTags: ['messenger_contact']
			}),
			updateMessengerContact: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/contacts/${queryArg.id}`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['messenger_contact']
			}),
			deleteMessengerContact: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/contacts/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_contact']
			}),
			getMessengerChats: build.query({
				query: () => ({ url: `/mock-api/messenger/chats` }),
				providesTags: ['messenger_chats']
			}),
			getMessengerChat: build.query({
				query: (queryArg) => ({ url: `/mock-api/messenger/chats/${queryArg}` }),
				providesTags: ['messenger_chat']
			}),
			deleteMessengerChat: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/chats/${queryArg}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['messenger_chats']
			}),
			sendMessengerMessage: build.mutation({
				query: (queryArg) => {
					const formData = new FormData();
					formData.append('message', queryArg.message);
					if (queryArg.files && queryArg.files.length > 0) {
						queryArg.files.forEach((file, index) => {
							formData.append(`file${index + 1}`, file); // Appending each file with a unique key
						});
					}
					return {
						url: `/mock-api/messenger/chats/${queryArg.contactId}`,
						method: 'POST',
						data: formData, // Use FormData here
						headers: {
							'Content-Type': 'multipart/form-data' // Important for file uploads
						}
					}
				},
				invalidatesTags: ['messenger_chat', 'messenger_chats']
			}),
			getMessengerUserProfile: build.query({
				query: () => ({ url: `/mock-api/messenger/profile` }),
				providesTags: ['messenger_user_profile']
			}),
			updateMessengerUserProfile: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/messenger/profile`,
					method: 'PUT',
					data: queryArg
				}),
				invalidatesTags: ['messenger_user_profile']
			})
		}),
		overrideExisting: false
	});
export default MessengerApi;
export const {
	useGetMessengerContactsQuery,
	useGetMessengerContactQuery,
	useUpdateMessengerContactMutation,
	useDeleteMessengerContactMutation,
	useGetMessengerChatsQuery,
	useGetMessengerChatQuery,
	useDeleteMessengerChatMutation,
	useGetMessengerUserProfileQuery,
	useUpdateMessengerUserProfileMutation,
	useSendMessengerMessageMutation
} = MessengerApi;
