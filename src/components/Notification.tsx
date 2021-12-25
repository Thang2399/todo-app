import React, {useEffect} from 'react';
import {ItemType} from "../types/propsType";

type Props = {
    message: string,
    type: string,
    removeNotification: any,
    listItems: ItemType[]
}

const Notification: React.FC<Props> = ({message, type, removeNotification, listItems}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeNotification(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [listItems])

    return (
        <div>
            <h1 className={`${type}`}>{message}</h1>
        </div>
    );
};

export default Notification;
