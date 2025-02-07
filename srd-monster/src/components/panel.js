/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { __experimentalInputControl as InputControl, Panel, PanelBody, PanelRow } from '@wordpress/components';

import { statList, calculateMod } from './stats';
import { damageTypes } from './damage';
import { roll } from 'dnd5e-dice-roller';

const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
const types = ["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"];

const outputOptions = (items) => {
	const elems = items.map((item) => <option value={item}>{item}</option>)
	elems.unshift(<option value="">-- Select One--</option>)
	return elems
}

export const MonsterPanel = ({ setAttributes, attributes }) => {

	const onChangeEvent = (e) => {
		let savedValue = e.target.value
		if (e.target.type === "number") {
			savedValue = parseInt(savedValue)
			if ((e.target.min && savedValue < parseInt(e.target.min)) || (e.target.max && savedValue > parseInt(e.target.max))) {
				return
			}
		}
		setAttributes({ [e.target.name]: savedValue });
	}

	const onSaveChange = (e) => {
		setAttributes({
			[e.target.name]: {
				...attributes[e.target.name],
				[e.target.dataset.member]: e.target.value
			}
		})

	}

	const onHitDieChange = (e) => {
		onChangeEvent(e)
		try {
			const calcHitPoints = roll(e.target.value.replace(/\s/g, ''))
			setAttributes({ "hitPoints": calcHitPoints })
		} catch (e) {
			console.error(e)
		}
	}

	const updateDamageModification = (e) => {
		setAttributes({
			damageModifications: {
				...attributes.damageModifications,
				[e.target.name]: e.target.value
			}
		})
	}

	const saveInputs = statList.map(stat => (
		<PanelRow>
			<legend className="blocks-base-control__label">
				{__(stat, 'srd-monster')}
			</legend>
			<input
				onChange={onSaveChange}
				name="savingThrows"
				data-member={stat}
				type="number"
				min={-5}
				max={10}
				placeholder={calculateMod(attributes[stat])}
				value={attributes.savingThrows && attributes.savingThrows[stat] && attributes.savingThrows[stat]}
				step={1}
			/>
		</PanelRow>
	))

	const statInputs = statList.map(stat => (
		<PanelRow>
			<legend className="blocks-base-control__label">
				{__(stat, 'srd-monster')}
			</legend>
			<input onChange={onChangeEvent} name={stat} type="number" min={1} max={30} value={attributes[stat]} step={1} />
		</PanelRow>
	))

	const damageInputs = damageTypes.map(type => (
		<PanelRow>
			<legend className="blocks-base-control__label">
				{__(type, 'srd-monster')}
			</legend>
			<select
				onChange={updateDamageModification}
				value={attributes.damageModifications && attributes.damageModifications[type] ? attributes.damageModifications[type] : "none"}
				name={type}
			>
				<option value="none">{__('None', 'srd-monster')}</option>
				<option value="vulnerable">{__('Vulnerable', 'srd-monster')}</option>
				<option value="resistant">{__('Resistant', 'srd-monster')}</option>
				<option value="imune">{__('Imune', 'srd-monster')}</option>
			</select>
		</PanelRow>
	))

	const MovementRow = ({ type, currentValue, onChangeEvent }) => (
		<PanelRow>
			<legend className="blocks-base-control__label">
				{__(type + ' speed', 'srd-monster')}
			</legend>
			<input onChange={onChangeEvent} name={type} type="number" min={0} value={currentValue} step={1} />
		</PanelRow>
	)

	return (
		<Panel className="srd-monster-admin-panel">
			<PanelBody title="Meta" initialOpen={true}>
				<PanelRow>
					<legend className="blocks-base-control__label">
						{__('Size', 'srd-monster')}
					</legend>
					<select onChange={onChangeEvent} name="size" defaultValue={attributes.size}>
						{outputOptions(sizes)}
					</select>
				</PanelRow>
				<PanelRow>
					<legend className="blocks-base-control__label">
						{__('Type', 'srd-monster')}
					</legend>
					<select onChange={onChangeEvent} name="type" defaultValue={attributes.type}>
						{outputOptions(types)}
					</select>
				</PanelRow>
				<PanelRow>
					<legend className="blocks-base-control__label">
						{__('Armor Class', 'srd-monster')}
					</legend>
					<input onChange={onChangeEvent} name="ac" type="number" min={0} max={30} value={attributes.ac} placeholder="AC" step={1} />
				</PanelRow>
				<PanelRow>
					<legend className="blocks-base-control__label">
						{__('Hit Die', 'srd-monster')}
					</legend>
					<input onChange={onHitDieChange} name="hitDie" value={attributes.hitDie} placeholder="Hit Die"></input>
				</PanelRow>
				<MovementRow type="land" currentValue={attributes.land} onChangeEvent={onChangeEvent} />
			</PanelBody>
			<PanelBody title="Other Movement" initialOpen={false}>
				<MovementRow type="burrow" currentValue={attributes.burrow} onChangeEvent={onChangeEvent} />
				<MovementRow type="fly" currentValue={attributes.fly} onChangeEvent={onChangeEvent} />
				<MovementRow type="swim" currentValue={attributes.swimcalculateMod} onChangeEvent={onChangeEvent} />
			</PanelBody>
			<PanelBody title="Stats" initialOpen={true} className="stats-panel">
				{statInputs}
			</PanelBody>
			<PanelBody title="Saves" initialOpen={false} className="stats-panel">
				{saveInputs}
			</PanelBody>
			<PanelBody title="Damage Modification" initialOpen={false}>
				{damageInputs}
			</PanelBody>
		</Panel>
	)
};
