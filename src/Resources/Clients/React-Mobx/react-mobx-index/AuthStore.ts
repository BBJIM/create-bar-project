import API from 'Api';
import { alertMessage, alertStrings, hideAfterTimeSec } from 'Common/AlertMessage';
import { LoginFormValues, RegisterFormValues } from 'Common/FormValuesTypes';
import { User } from 'Common/Models';
import { removeToken, saveToken } from 'Common/Utils/Cookies';
import { action, computed, observable } from 'mobx';
import { GenericStore } from 'Logic/Stores';

export default class AuthStore {
	@observable
	private currentUser?: User;

	private genericStore: GenericStore;

	constructor(genericStore: GenericStore) {
		this.genericStore = genericStore;
	}

	@computed
	public get getCurrentUser(): User | undefined {
		return this.currentUser;
	}

	@action
	public async logIn(loginData: LoginFormValues): Promise<void> {
		try {
			const { token, ...rest } = (await API.post('/auth/login', loginData)) as any;
			saveToken(token);
			this.currentUser = { ...rest };
			await this.genericStore?.fetch('Role');
			alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}

	@action
	public logout(): void {
		this.currentUser = undefined;
		removeToken();
		alertMessage.success(alertStrings.logOutSuccess, { hideAfter: hideAfterTimeSec });
	}

	@action
	public async register(registerData: RegisterFormValues): Promise<void> {
		try {
			const { token, ...rest } = (await API.post('/auth/register', registerData)) as any;
			saveToken(token);
			this.currentUser = { ...rest };
			await this.genericStore?.fetch('Role');
			alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}

	@action
	public async fetchCurrentUser(): Promise<User | undefined> {
		this.currentUser = await API.post('/auth/login');
		return this.currentUser;
	}
}
