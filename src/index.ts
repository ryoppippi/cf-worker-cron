export type Env = {
	HOOK_URLS: string;
};

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		const urls = env.HOOK_URLS.split(';');
		const promises = urls.map(async (url) => {
			const res = await fetch(url, { method: 'POST' });
			if (!res.ok) {
				console.error(`Failed to trigger url: ${url}`);
				throw new Error(`Failed to trigger url: ${url}`);
			}
			// eslint-disable-next-line no-console
			console.log(`Triggered url: ${url}`);
			return res;
		});
		ctx.waitUntil(Promise.all(promises));
	},
};
