import React, {useState, useEffect} from 'react';

import Notification from "./Notification";
import ListItems from "./listItems/ListItems";
import {ItemType, NotificationType} from "../types/propsType";
import ListRemovedItems from "./listremovedItems/ListRemovedItems";

const getLocalStorageListItems: any = () => {
    const listItems: string | null = localStorage.getItem('list');
    if (listItems) {
        // return JSON.parse(localStorage.getItem('list') || '{}')

        // the ! is call "Non-null assertion operator" and it tells the compiler that the return below is not null
        return JSON.parse(localStorage.getItem('list')!)
    } else return []
}

const getLocalStorageListRemovedItems: any = () => {
    const listRemovedItems: string | null = localStorage.getItem('listRemovedItems');
    if (listRemovedItems) {
        return JSON.parse(localStorage.getItem('listRemovedItems')!);
    } else return []
}

export default function Components(): JSX.Element {
    const [inputValue, setInputValue] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    // const [listItems, setListItems] = useState<ItemType[]>([]);
    const [listItems, setListItems] = useState<ItemType[]>(getLocalStorageListItems);
    const [notification, setNotification] = useState<NotificationType>({
        show: false,
        message: '',
        type: ''
    });
    const [listRemovedItems, setListRemovedItems] = useState<ItemType[]>(getLocalStorageListRemovedItems)

    const showNotification = (show: boolean, message: string, type: string) => {
        setNotification({show, message, type});
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // no value typed
        if (!inputValue) {
            showNotification(true, 'Empty value', 'danger')
        }
        // editing item
        else if (inputValue && isEditing) {
            setListItems(listItems.map((item: any) => {
                    if (item.id === editItemId) {
                        return {...item, title: inputValue};
                    } else return item
                }
            ));
            setInputValue('')
            setIsEditing(false);
            setEditItemId(null);
            showNotification(true, 'Edit successfully', 'success');
        }
        // add a new item
        else {
            const newItem = {
                title: inputValue,
                id: Math.random().toString()
            }
            setListItems([...listItems, newItem]);
            setInputValue('');
            showNotification(true, 'Added', 'success')
        }
    }

    const clearAll = () => {
        showNotification(true, 'Cleared All', 'success');
        setListItems([])
    }

    const removeItem = (id: string) => {
        const removedItem = listItems.find((item: any) => item.id === id);
        if (removedItem) {
            setListItems(listItems.filter((item: any) => item.id !== removedItem.id));
            setListRemovedItems([...listRemovedItems, removedItem]);
            showNotification(true, 'Removed Item', 'success');
        }
    }

    const editItem = (id: string) => {
        const editingItem: ItemType | undefined = listItems?.find((item: any) => item.id === id);
        if (editingItem) {
            setIsEditing(true);
            setInputValue(editingItem?.title);
            setEditItemId(editingItem?.id);
        }
    }

    const redoItem = (id: string) => {
        const redoSingleItem = listRemovedItems.find((item: any) => item.id === id);
        if (redoSingleItem) {
            setListRemovedItems(listRemovedItems.filter((item: any) => item.id !== redoSingleItem.id));
            setListItems([...listItems, redoSingleItem]);
        }
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(listItems));
        localStorage.setItem('listRemovedItems', JSON.stringify(listRemovedItems))
    }, [listItems, listRemovedItems])

    return (
        <div>
            <div>
                {notification.show &&
                    <Notification {...notification} removeNotification={showNotification} listItems={listItems}/>}
                <h1>Todo List</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text" placeholder="What are you doing?"
                    value={inputValue}
                    onChange={(e: any) => setInputValue(e.target.value)}
                />
                <button>{isEditing ? "Edit" : "Add"}</button>
            </form>

            {listItems.length > 0
                ? <ListItems listItems={listItems} clearAll={clearAll} removeItem={removeItem} editItem={editItem}/>
                : null}

            {listRemovedItems.length > 0
                ? <ListRemovedItems listRemovedItems={listRemovedItems} redoItem={redoItem}/>
                : null}
        </div>
    );
};
