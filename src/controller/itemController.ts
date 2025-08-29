import { Item } from '../models/item';

let items: Item[] = [];

let currentId = 1;

export const getItems = (): Item[] => {
  return items;
};

export const addItem = (name: string, purchased: boolean, quantity: number, size: string): Item => {
    let item: Item = {
        id: currentId++,
        name: name,
        purchased: purchased,
        quantity: quantity,
        size: size
    };
    items.push(item);
    return item;
}

export const getAllItems = (): Item[] => {
    return items;
}

export const getItemById = (id: number): Item | undefined => {
    const item = items.find(item => item.id === id);
    return item;
}