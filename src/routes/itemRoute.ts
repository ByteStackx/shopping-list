import { IncomingMessage, ServerResponse } from 'http';
import { addItem, getAllItems, getItemById, updateItem, deleteItem } from '../controller/itemController';
import { sendError } from '../utils/errorHandler';

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
        if (isNaN(id)) return sendError(res, 400, 'Invalid ID');

      const item = getItemById(id);
      if (!item) return sendError(res, 404, 'Item not found');

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

          if (!name || typeof name !== 'string')
            errors.push('Name is required');
          if (typeof purchased !== 'boolean')
            errors.push('Purchased must be a boolean');
          if (typeof quantity !== 'number')
            errors.push('Quantity must be a number');
          if (!size || typeof size !== 'string')
            errors.push('Size is required');

          if (errors.length > 0) 
            return sendError(res, 400, errors.join(', '));

          const newItem = addItem(name, purchased, quantity, size);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newItem));
        } catch {
          return sendError(res, 400, 'Invalid JSON');
        }
      });
      return;
    }

    // PUT /items/:id
    if (req.method === 'PUT' && id) {
      if (isNaN(id)) return sendError(res, 400, 'Invalid ID');

      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const { name, purchased, quantity, size } = JSON.parse(body);
          const errors: string[] = [];

          if (name !== undefined && typeof name !== 'string')
            errors.push('Name must be a string');
          if (purchased !== undefined && typeof purchased !== 'boolean')
            errors.push('Purchased must be a boolean');
          if (quantity !== undefined && typeof quantity !== 'number')
            errors.push('Quantity must be a number');
          if (size !== undefined && typeof size !== 'string')
            errors.push('Size must be a string');

          if (errors.length > 0) 
            return sendError(res, 400, errors.join(', '));

          const updatedItem = updateItem(id, { name, purchased, quantity, size });

          if (!updatedItem) 
            return sendError(res, 404, 'Item not found');

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(updatedItem));
        } catch {
          return sendError(res, 400, 'Invalid JSON');
        }
      });
      return;
    }

    // DELETE /items/:id
    if (req.method === 'DELETE' && id) {
        if (isNaN(id)) 
            return sendError(res, 400, 'Invalid ID');

        const deleted = deleteItem(id);
        
        if (!deleted) 
            return sendError(res, 404, 'Item not found');

        res.writeHead(204);
        res.end();
        return;
    }


    // Method not allowed for /items
    return sendError(res, 405, 'Method Not Allowed on /items');
  }

  // Not an /items route
  return sendError(res, 404, 'Route Not Found');
};
