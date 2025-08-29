import { IncomingMessage, ServerResponse } from 'http';
import { addItem, getAllItems, getItemById } from '../controller/itemController';

export const itemRoute = async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith('/items')) {
        const parts = req.url.split('/');
        const id = parts[2] ? parseInt(parts[2]) : undefined;

        // GET /items
        if (req.method === 'GET' && !id) {
            const items = getAllItems();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
            return;
        }

        // GET /items/:id
        if (req.method === 'GET' && id) {
            if (isNaN(id)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid ID' }));
                return;
            }

            const item = getItemById(id);
            if (!item) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Item not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
            return;
        }

        // POST /items
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    const { name, purchased, quantity, size } = JSON.parse(body);
                    const errors: string[] = [];

                    if (!name || typeof name !== "string") errors.push('Name is required');
                    if (typeof purchased !== "boolean") errors.push('Purchased must be a boolean');
                    if (typeof quantity !== "number") errors.push('Quantity must be a number');
                    if (!size || typeof size !== "string") errors.push('Size is required');

                    if (errors.length > 0) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ errors }));
                        return;
                    }

                    const newItem = addItem(name, purchased, quantity, size);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newItem));
                    return;
                } catch (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                    return;
                }
            });

            return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed on /items' }));
        return; 
    }

    // Not an /items route
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route Not Found' }));
};
