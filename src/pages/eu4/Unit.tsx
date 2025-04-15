import { StateContext } from '@components/layout/Default.tsx';
import { InputProps, InputType } from '@components/layout/form.type.ts';
import { ModFormLayout } from '@components/layout/ModFormLayout.tsx';
import { isLandUnit, Unit, UnitType } from '@eu4/types.ts';
import { SelectChangeEvent } from '@mui/material';
import { getRoutes } from '@routes.ts';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UnitPage() {
  const navigate = useNavigate();
  const routes = getRoutes();
  const { globalState } = useContext(StateContext)!;

  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<UnitType>(UnitType.INFANTRY);
  const [unitType, setUnitType] = useState<string>('');
  const [maneuver, setManeuver] = useState<string>('0');
  const [offensiveMorale, setOffensiveMorale] = useState<string>('0');
  const [defensiveMorale, setDefensiveMorale] = useState<string>('0');
  const [offensiveFire, setOffensiveFire] = useState<string>('0');
  const [defensiveFire, setDefensiveFire] = useState<string>('0');
  const [offensiveShock, setOffensiveShock] = useState<string>('0');
  const [defensiveShock, setDefensiveShock] = useState<string>('0');
  const [hullSize, setHullSize] = useState<string>('0');
  const [baseCannons, setBaseCannons] = useState<string>('0');
  const [sailSpeed, setSailSpeed] = useState<string>('0');
  const [blockade, setBlockade] = useState<string>('0');
  const [spriteLevel, setSpriteLevel] = useState<string>('0');
  const [sailors, setSailors] = useState<string>('0');
  const [tradePower, setTradePower] = useState<string>('0');

  useEffect(() => {
    if (!globalState || !globalState.handle) {
      navigate(routes.HOME);
    } else {
      (async () => {
        if (globalState.item && globalState.item.file && globalState.handle) {
          const unit: Unit = await globalState.item.file.getFile(globalState.handle);

          setName(globalState.item.file.name);
          setType(unit.type);
          setUnitType(unit.unit_type ?? '');
          setManeuver(unit.maneuver ? unit.maneuver.toString() : '0');
          setOffensiveMorale(unit.offensive_morale ? unit.offensive_morale.toString() : '0');
          setDefensiveMorale(unit.defensive_morale ? unit.defensive_morale.toString() : '0');
          setOffensiveFire(unit.offensive_fire ? unit.offensive_fire.toString() : '0');
          setDefensiveFire(unit.defensive_fire ? unit.defensive_fire.toString() : '0');
          setOffensiveShock(unit.offensive_shock ? unit.offensive_shock.toString() : '0');
          setDefensiveShock(unit.defensive_shock ? unit.defensive_shock.toString() : '0');
          setHullSize(unit.hull_size ? unit.hull_size.toString() : '0');
          setBaseCannons(unit.base_cannons ? unit.base_cannons.toString() : '0');
          setSailSpeed(unit.sail_speed ? unit.sail_speed.toString() : '0');
          setBlockade(unit.blockade ? unit.blockade.toString() : '0');
          setSpriteLevel(unit.sprite_level ? unit.sprite_level.toString() : '0');
          setSailors(unit.sailors ? unit.sailors.toString() : '0');
          setTradePower(unit.trade_power ? unit.trade_power.toString() : '0');
        }
      })();
    }
  }, [globalState]);

  const handleSubmit = async () => {
    setLoading(true);

    if (globalState && globalState.item && globalState.item.file && globalState.handle) {
      const unit: Unit = await globalState.item.file.getFile(globalState.handle);
      unit.type = type;
      unit.unit_type = unitType ? unitType : undefined;

      if (isLandUnit(type)) {
        unit.maneuver = Number.parseInt(maneuver);
        unit.offensive_morale = Number.parseInt(offensiveMorale);
        unit.defensive_morale = Number.parseInt(defensiveMorale);
        unit.offensive_fire = Number.parseInt(offensiveFire);
        unit.defensive_fire = Number.parseInt(defensiveFire);
        unit.offensive_shock = Number.parseInt(offensiveShock);
        unit.defensive_shock = Number.parseInt(defensiveShock);
        unit.hull_size = undefined;
        unit.base_cannons = undefined;
        unit.sail_speed = undefined;
        unit.blockade = undefined;
        unit.sprite_level = undefined;
        unit.sailors = undefined;
        unit.trade_power = undefined;
      } else {
        unit.maneuver = undefined;
        unit.offensive_morale = undefined;
        unit.defensive_morale = undefined;
        unit.offensive_fire = undefined;
        unit.defensive_fire = undefined;
        unit.offensive_shock = undefined;
        unit.defensive_shock = undefined;
        unit.hull_size = Number.parseInt(hullSize);
        unit.base_cannons = Number.parseInt(baseCannons);
        unit.sail_speed = Number.parseInt(sailSpeed);
        unit.blockade = Number.parseInt(blockade);
        unit.sprite_level = Number.parseInt(spriteLevel);
        unit.sailors = Number.parseInt(sailors);
        unit.trade_power = Number.parseFloat(tradePower);
      }

      await globalState.item.file.writeFile(globalState.handle, unit);
    }

    setLoading(false);
  };

  const inputs: InputProps<any>[] = [
    {
      type: InputType.SELECT,
      required: false,
      label: 'input.unit.type',
      value: type,
      onChange: (event: SelectChangeEvent<UnitType>) => {
        setType(event.target.value as UnitType);
      },
      values: Object.values(UnitType),
      translation: s => `unit.type.${ s }`,
    },
    {
      type: InputType.TEXT,
      required: false,
      label: 'input.unit.unitType',
      value: unitType,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setUnitType(event.target.value),
      tooltip: 'input.unit.unitType.tooltip',
    },
  ];

  if (isLandUnit(type)) {
    inputs.push(
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.maneuver',
        value: maneuver,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setManeuver(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.offensiveMorale',
        value: offensiveMorale,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setOffensiveMorale(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.defensiveMorale',
        value: defensiveMorale,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setDefensiveMorale(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.offensiveFire',
        value: offensiveFire,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setOffensiveFire(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.defensiveFire',
        value: defensiveFire,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setDefensiveFire(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.offensiveShock',
        value: offensiveShock,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setOffensiveShock(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.defensiveShock',
        value: defensiveShock,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setDefensiveShock(event.target.value),
        min: 0,
      });
  } else {
    inputs.push(
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.hullSize',
        value: hullSize,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setHullSize(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.baseCannons',
        value: baseCannons,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setBaseCannons(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.sailSpeed',
        value: sailSpeed,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setSailSpeed(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.blockade',
        value: blockade,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setBlockade(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.spriteLevel',
        value: spriteLevel,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setSpriteLevel(event.target.value),
        min: 0,
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.sailors',
        value: sailors,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setSailors(event.target.value),
        min: 0,
        tooltip: 'input.unit.sailors.tooltip',
      },
      {
        type: InputType.NUMBER,
        required: false,
        label: 'input.unit.tradePower',
        value: tradePower,
        onChange: (event: ChangeEvent<HTMLInputElement>) => setTradePower(event.target.value),
        step: 0.1,
        min: 0,
        allowFloat: true,
      },
    );
  }

  return (
    globalState && globalState.handle &&
    <ModFormLayout name={ name } handle={ globalState.handle } handleSubmit={ handleSubmit } loading={ loading }
                   inputs={ inputs } />
  );
}