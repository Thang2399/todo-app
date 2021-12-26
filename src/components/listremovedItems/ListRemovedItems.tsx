import React from 'react';
import SingleRemovedItem from "./singleRemovedItem/SingleRemovedItem";
import {ItemType} from "../../types/propsType";

type Props = {
    listRemovedItems: ItemType[],
    redoItem: (id: string) => void
}

const ListRemovedItems: React.FC<Props> = ({listRemovedItems, redoItem}) => {
    return (
        <div>
            <h1>Finished List:</h1>
            {listRemovedItems.map((item: any) =>
                <SingleRemovedItem key={item.id} item={item} redoItem={redoItem}/>
            )}
        </div>
    );
};

export default ListRemovedItems;
