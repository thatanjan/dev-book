import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import TelegramIcon from '@material-ui/icons/Telegram'
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'

export class NavigationItem {
	label: string

	value: string

	icon: Function

	constructor(label: string, icon: Function) {
		this.label = label
		this.value = label.toLowerCase()
		this.icon = icon
	}
}

const notification = new NavigationItem('notification', NotificationsIcon)
const profile = new NavigationItem('profile', AccountCircleIcon)
const chat = new NavigationItem('chat', TelegramIcon)
const dropdown = new NavigationItem('dropdown', ArrowDropDownCircleIcon)

const navigationItems: NavigationItem[] = [
	notification,
	profile,
	chat,
	dropdown,
]

export default navigationItems
