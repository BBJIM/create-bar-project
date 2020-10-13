import { themeKey, themes } from 'ui-kit/src/Common/Themes';
import { setStorageItem } from 'Common/Utils/Storage';
import { action, computed, observable } from 'mobx';
import { defaultTheme, ITheme } from 'ui-kit/src/Theme';

export default class UiStore {
	@observable
	private blocked = true; // this is true at the start because we try to login at the start of the web application - see App and AdminRoute

	@observable
	private sidebarOpen = false;

	@observable
	private currentTheme: ITheme = defaultTheme;

	@computed
	public get getBlockedUi() {
		return this.blocked;
	}

	@computed
	public get getSideBarOpen() {
		return this.sidebarOpen;
	}

	@computed
	public get theme() {
		return this.currentTheme;
	}

	@action
	public blockUI() {
		this.blocked = true;
	}

	@action
	public unBlockUI() {
		this.blocked = false;
	}

	@action
	public setSidebarOpen(value: boolean) {
		this.sidebarOpen = value;
	}

	@action
	public setThemeByName(themeName: themeKey) {
		this.currentTheme = themes[themeName];
		setStorageItem('theme', themeName);
	}
}
