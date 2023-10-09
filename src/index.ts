export interface Env {
	HOOK_URLS: string;
}

export default {
	async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
		const urls = env.HOOK_URLS.split(';');
		const promises = urls.map((url) => fetch(url, { method: 'POST' }));

		for await (const resp of promises) {
			const wasSuccessful = resp.ok ? 'success' : 'fail';
			console.log(`trigger fired at ${event.cron}: ${wasSuccessful}\n url: ${resp.url}`);
		}
	},
};
