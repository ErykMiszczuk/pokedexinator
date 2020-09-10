import React, { useEffect, useState } from 'react';
import PokemonType from '../PokemonType/PokemonType';
import './PokemonDetailsDamageRelations.css';
import * as R from 'ramda';

function PokemonDetailsDamageRelations(props) {

    const [damageRelations, setDamageRelations] = useState('');

    useEffect(() => {
        // droping unnecesary data, coz we dont need data about pokemon generation, just damage relations of all pokemon types
        let damageData = props.damageRelations.map(el => el.damage_relations)

        // merge all damage relations in one object
        let [t, ...rest] = damageData;
        rest.map(el => R.keys(el).map(key => t[key] = [...t[key], ...el[key]]));

        // delete repeating data in object values
        t = R.map(x => R.uniq(x), t);

        // intersection of pokemon types that deal double and half damage 
        // realy deal normal damage so we need to exclude them from both sets
        let intersectDamageGained = R.intersection(t.double_damage_from, t.half_damage_from);
        // t.double_damage_from = t.double_damage_from.filter((el) => R.find(x => x !== el, intersectDamageGained));
        // t.half_damage_from = t.half_damage_from.filter((el) => R.find(x => x !== el, intersectDamageGained));
        t.double_damage_from = R.difference(t.double_damage_from, intersectDamageGained)
        t.half_damage_from = R.difference(t.half_damage_from, intersectDamageGained)

        // intersection of pokemon types that receive from our pokemon double and half damage 
        // actualy receive normal damage so like in above code we need to exclude intersected pokemon types
        let intersectDamgeDealed = R.intersection(t.double_damage_to, t.half_damage_to);
        // t.double_damage_to = t.double_damage_to.filter((el) => R.find(x => x !== el, intersectDamgeDealed));
        // t.half_damage_to = t.half_damage_to.filter((el) => R.find(x => x !== el, intersectDamgeDealed));
        t.double_damage_to = R.difference(t.double_damage_to, intersectDamgeDealed)
        t.half_damage_to = R.difference(t.half_damage_to, intersectDamgeDealed)

        setDamageRelations(t)

    }, [props.damageRelations])

    if (damageRelations !== '') {

        return (
            <div className="pokemon_details__damage_relations">
                <div className="pokemon_details__header">
                    Damage relations
                </div>
                <div className="damage_relations__double_damage_from">
                    <div>Receive double damage</div>
                    { damageRelations.double_damage_from.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
                <div className="damage_relations__double_damage_to">
                    <div>Deal double damage</div>
                    { damageRelations.double_damage_to.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
                <div className="damage_relations__half_damage_from">
                    <div>Receive half damage</div>
                    { damageRelations.half_damage_from.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
                <div className="damage_relations__half_damage_to">
                    <div>Deal half damage</div>
                    { damageRelations.half_damage_to.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
                <div className="damage_relations__no_damage_from">
                    <div>Receive no damage</div>
                    { damageRelations.no_damage_from.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
                <div className="damage_relations__no_damage_to">
                    <div>Deal no damage</div>
                    { damageRelations.no_damage_to.map((el, i) => <PokemonType pokemonType={{type: el}} key={`${el}${i}`} />) }
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default PokemonDetailsDamageRelations;