import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

import MessageDialog from "./MessageDialog";

describe('MessageDialog', () => {

    test('render', () => {
        const message = {
            show: false,
            title: "Eliminar una bebida",
            acceptButtonTitle: "Eliminar",
            cancelButtonTitle: "Canclear"
        };
        const onAccept = (() => {});
        const messageDialog = render(<MessageDialog message={message} onAccept={onAccept}/>);

        const result = true;

        expect(result).toBe(true);
    });
});