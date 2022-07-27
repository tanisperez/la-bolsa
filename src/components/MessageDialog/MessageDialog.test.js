import React from 'react';
import {render, fireEvent, waitFor, screen, queryByText} from '@testing-library/react';

import MessageDialog from './MessageDialog';

describe('MessageDialog', () => {
    test('render hidden', () => {
        const message = {
            show: false,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            }
        };

        render(<MessageDialog message={message} onAccept={((data) => {})}/>);

        expect(screen.queryByText(message.title)).not.toBeInTheDocument();
    });

    test('render visible', () => {
        const message = {
            show: true,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            },
            body: '¿Deseas eliminar Absolut?'
        };

        render(<MessageDialog message={message} onAccept={((data) => {})}/>);

        expect(screen.queryByText(message.title)).toBeInTheDocument();
        expect(screen.queryByText(message.buttons.cancelTitle)).toBeInTheDocument();
        expect(screen.queryByText(message.buttons.acceptTitle)).toBeInTheDocument();
        expect(screen.queryByText(message.body)).toBeInTheDocument();
    });

    test('switch from hidden to visible', () => {
        const hiddenMessage = {
            show: false,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            }
        };

        const { rerender } = render(<MessageDialog message={hiddenMessage} onAccept={((data) => {})}/>);
        expect(screen.queryByText(hiddenMessage.title)).not.toBeInTheDocument();

        const message = {
            show: true,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            },
            body: '¿Deseas eliminar Absolut?'
        };
        rerender(<MessageDialog message={message} onAccept={((data) => {})}/>);
        expect(screen.queryByText(message.title)).toBeInTheDocument();
        expect(screen.queryByText(message.buttons.cancelTitle)).toBeInTheDocument();
        expect(screen.queryByText(message.buttons.acceptTitle)).toBeInTheDocument();
        expect(screen.queryByText(message.body)).toBeInTheDocument();
    });

    test('close message dialog', async () => {
        const message = {
            show: true,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            },
            body: '¿Deseas eliminar Absolut?'
        };

        render(<MessageDialog message={message} onAccept={((data) => {})}/>);
        expect(screen.getByRole('dialog')).toHaveClass('show');

        const closeButton = screen.getByRole('button', {name: 'Close'});
        await waitFor(() => fireEvent.click(closeButton));

        expect(screen.getByRole('dialog')).not.toHaveClass('show');
    });

    test('cancel message dialog', async () => {
        const message = {
            show: true,
            title: 'Eliminar una bebida',
            buttons: {
                cancelTitle: 'Cancelar',
                acceptTitle: 'Eliminar'
            },
            body: '¿Deseas eliminar Absolut?'
        };

        render(<MessageDialog message={message} onAccept={((data) => {})}/>);
        expect(screen.getByRole('dialog')).toHaveClass('show');

        const cancelButton = screen.getByText('Cancelar');
        await waitFor(() => fireEvent.click(cancelButton));

        expect(screen.getByRole('dialog')).not.toHaveClass('show');
    });
});