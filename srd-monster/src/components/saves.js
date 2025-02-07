/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

export const Saves = ({ savingThrows }) => {
    if (!savingThrows || typeof (savingThrows) !== "object") {
        return
    }
    const savingThrowsLine = Object.keys(savingThrows).map(key => savingThrows[key] && <li className="saving-throw-mod">{key} {savingThrows[key] > 0 ? "+" + savingThrows[key] : savingThrows[key]}</li>).filter(elem => elem)
    if (savingThrowsLine.length > 0) {
        return (<li><strong>{__('Saving Throws', 'srd-monster')}</strong> <ul>{savingThrowsLine}</ul></li>)
    }
    return
}
