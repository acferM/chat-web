# React Messages

This is a simple chat app, integrated with github.

Your following users turn into your contacts and your orgs, become groups.

## Starting project locally

1. [Install server](https://github.com/acferM/chat-server#readme)

2. Clone the repository
	```bash
	git clone https://github.com/acferM/chat-web.git
	```

3. Install the dependencies

    with yarn:
	```bash
	yarn
	```

	with npm:
	```bash
	npm i
	```

4. Add the env variables on .env.local file following the .env.example

	```
	GITHUB_CLIENT_ID=Client_id_from_your_OAuth_app_from_github
	GITHUB_CLIENT_SECRET=Client_secret_from_your_OAuth_app_from_github
	```

5. Run in dev mode
	with yarn:
	```bash
	yarn dev
	```

	with npm:
	```bash
	npm run dev
	```

## Technologies used in the project

- [NextJS](https://nextjs.org)
- [NextAuth](https://next-auth.js.org)
- [Styled-Components](https://styled-components.com)
- [SocketIO](https://socket.io)
