/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls, InnerBlocks } from '@wordpress/block-editor';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { Stats, Saves, MonsterPanel, DamageModifications, Movement, Line } from "./components"

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = (props) => {

	const {
		attributes: { name, size, type, ac, hitPoints, hitDie, savingThrows, damageModifications, land, burrow, swim, fly },
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onChangeName = (newContent) => {
		setAttributes({ name: newContent });
	};

	return (<div {...blockProps}>
		<RichText
			placeholder="Monster name"
			tagName="h2"
			onChange={onChangeName}
			value={name}
		/>

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
			<InnerBlocks />
		</div>
		<InspectorControls key="setting">
			<MonsterPanel setAttributes={setAttributes} attributes={props.attributes} />
		</InspectorControls>
	</div>);
};
export default Edit;
