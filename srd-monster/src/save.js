import { Stats, Saves, DamageModifications, Movement, Line } from "./components"

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
const Save = (props) => {
    const {
        attributes: { name, size, type, ac, hitDie, hitPoints, damageModifications, savingThrows, land, burrow, swim, fly },
    } = props;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h2" value={name} />
            <p className="meta"><span className="monsterSize">{size}</span>, <span className="monsterType">{type}</span></p>
            <Line />
            <ul className="basics">
                <li><strong>Armor Class</strong> {ac}</li>
                <li><strong>Hit Points</strong> {hitPoints} (<span className="hit-die">{hitDie}</span>)</li>
                <Movement land={land} burrow={burrow} fly={fly} swim={swim} />
            </ul>
            <Line />
            <Stats
                str={props.attributes.str}
                dex={props.attributes.dex}
                con={props.attributes.con}
                int={props.attributes.int}
                wis={props.attributes.wis}
                cha={props.attributes.cha}
            />
            <Line />
            <ul className="extras">
                <Saves savingThrows={savingThrows} />
                <DamageModifications damageModData={damageModifications} />
            </ul>
            <Line />
            <h3>Actions</h3>
            <div className="monsterActions">
                <InnerBlocks.Content />
            </div>
        </div>
    )
}
export default Save
