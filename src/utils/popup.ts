import { Root, Popup } from 'popup-ui';

interface PopupProps {
    type: 'Warning' | 'Danger' | 'Success';
    title: string;
    text: string;
}


export function popup({ type, title, text }: PopupProps) {
    Popup.show({
        type: type,
        title: title,
        button: true,
        textBody: text,
        buttonText: "Ok",
        callback: () => Popup.hide(),
    });
}