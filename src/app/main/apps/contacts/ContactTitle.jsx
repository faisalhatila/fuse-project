import { useGetContactsItemQuery } from './ContactsApi';

function ContactTitle(props) {
	const { contactId } = props;
	const { data: contact } = useGetContactsItemQuery(contactId, {
		skip: !contactId
	});
	return contact?.name || 'Contact';
}

export default ContactTitle;
