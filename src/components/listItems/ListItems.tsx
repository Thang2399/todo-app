import React from 'react';
import SingleItem from "./singleItem/SingleItem";
import {ItemType} from '../../types/propsType'

type Props = {
    listItems: ItemType[];
    clearAll: () => void,
    removeItem: (id: string) => void,
    editItem: (id: string) => void
}

const ListItems: React.FC<Props> = ({listItems, clearAll, removeItem, editItem}) => {
    return (
        <div>
            {listItems.map((item: any) => (
                <SingleItem key={item.id} item={item} removeItem={removeItem} editItem={editItem}/>
            ))}
            <button onClick={clearAll}>Clear All</button>
        </div>
    );
};

export default ListItems;
