import http, { IncomingMessage, ServerResponse } from 'http';
import { itemRoute } from './routes/itemRoute';

const PORT = 3000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    // Route: /items
    if (req.url?.startsWith('/items')) {
        itemRoute(req, res);
    } 
    // Default route
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
