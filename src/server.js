import Server from 'server-mapping/index.js'
const config = {
    url: 'https://riot-lol.herokuapp.com',
        actions: {
            get:{
                method: 'GET',
                path: '/champions'
            }
        }
}
const server = new Server(config);
export default server;