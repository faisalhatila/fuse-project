import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/hooks';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { toggleChatPanel } from './messengerPanelSlice';

/**
 * The chat panel toggle button.
 */
function MessengerPanelToggleButton(props) {
	const { children = <FuseSvgIcon>heroicons-outline:chat-bubble-left-right</FuseSvgIcon> } = props;
	const dispatch = useAppDispatch();
	return <IconButton onClick={() => dispatch(toggleChatPanel())}>{children}</IconButton>;
}

export default MessengerPanelToggleButton;
