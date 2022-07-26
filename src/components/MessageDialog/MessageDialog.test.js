import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

import MessageDialog from "./MessageDialog";

describe('MessageDialog', () => {
    test('render hidden', () => {
        const message = {
            show: true,
            title: "Eliminar una bebida",
            buttons: {
                cancelTitle: "Cancelar",
                acceptTitle: "Eliminar"
            }
        };
        const onAccept = ((data) => {});

        const { getByText } = render(<MessageDialog message={message} onAccept={onAccept}/>);
        
        const title = getByText("Eliminar una bebida");
        expect(title.innerHTML).toBe("Eliminar una bebida");

        expect(title).toBeInTheDocument();
    });

    test('render visible', () => {

    });

    test('switch from hidden to visible', () => {

    });
});