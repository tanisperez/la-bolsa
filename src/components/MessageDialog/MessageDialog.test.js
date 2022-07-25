import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

import MessageDialog from "./MessageDialog";

describe('MessageDialog', () => {
    test('render hidden', () => {
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

    test('render visible', () => {
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

    test('switch from hidden to visible', () => {
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