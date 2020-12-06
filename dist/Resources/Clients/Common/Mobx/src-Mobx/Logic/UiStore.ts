import { themeKey, themes } from 'ui-kit/src/Common/Themes';
import { setStorageItem } from 'Common/Utils/Storage';
import { action, computed, observable } from 'mobx';
import { defaultTheme, Theme } from 'ui-kit/src/Theme';

export default class UiStore {
	@observable
	private blocked = true; // this is true at the start because we try to login at the start of the web application - see App and AdminRoute

	@observable
	private sidebarOpen = false;

	@observable
	private currentTheme: Theme = defaultTheme;

	@computed
	public get getBlockedUi(): boolean {
		return this.blocked;
	}

	@computed
	public get getSideBarOpen(): boolean {
		return this.sidebarOpen;
	}

	@computed
	public get theme(): Theme {
		return this.currentTheme;
	}

	@action
	public blockUI(): void {
		this.blocked = true;
	}

	@action
	public unBlockUI(): void {
		this.blocked = false;
	}

	@action
	public setSidebarOpen(value: boolean): void {
		this.sidebarOpen = value;
	}

	@action
	public setThemeByName(themeName: themeKey): void {
		this.currentTheme = themes[themeName];
		setStorageItem('theme', themeName);
	}
}
