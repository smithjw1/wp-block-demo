/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

export const damageTypes = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]
export const DamageModifications = ({ damageModData }) => {
    const vulnerableLine = []
    const resistantLine = []
    const imuneLine = []
    if (!damageModData || typeof damageModData !== 'object' || damageModData === null) return
    Object.keys(damageModData).forEach(damageType => {
        const traslatedType = __(damageType, 'srd-monster')
        switch (damageModData[damageType]) {
            case "vulnerable": vulnerableLine.push(<li>{traslatedType}</li>); break;
            case "resistant": resistantLine.push(<li>{traslatedType}</li>); break;
            case "imune": imuneLine.push(<li>{traslatedType}</li>); break;
        }
    })
    return (
        <>
            {vulnerableLine.length > 0 && <li><strong>{__('Damage Vulnerablities', 'srd-monster')}</strong> <ul>{vulnerableLine}</ul></li>}
            {resistantLine.length > 0 && <li><strong>{__('Damage Resistances', 'srd-monster')}</strong> <ul>{resistantLine}</ul></li>}
            {imuneLine.length > 0 && <li><strong>{__('Damage Immunities', 'srd-monster')}</strong> <ul>{imuneLine}</ul></li>}
        </>
    )
}
