const bindEvent = (el: any, eventName: string, eventHandler: Function) => {
	if (el.addEventListener) {
		el.addEventListener(eventName, eventHandler, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + eventName, eventHandler);
	}
};

export default bindEvent;
