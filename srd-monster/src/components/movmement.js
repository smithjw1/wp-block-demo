/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

export const Movement = ({ land, burrow, fly, swim }) => (
    <li>
        <strong>{__('Speed', 'srd-monster')}</strong>
        <ul className="movement">
            {land && <li>{land} ft.</li>}
            {burrow && <li>{__('burrow', 'srd-monster')} {burrow} ft.</li>}
            {fly && <li>{__('fly', 'srd-monster')} {fly} ft.</li>}
            {swim && <li>sw{__('swim', 'srd-monster')}im {swim} ft.</li>}
        </ul>
    </li>
)
