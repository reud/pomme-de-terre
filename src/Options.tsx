import React, {useEffect, useState} from 'react';
import {Card, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, RadioGroup} from '@mui/material';

export interface RendererOptions {
  showInnerOrOuterLabel: boolean;
  showPositionLabel: boolean;
  showVerticesIndexLabel: boolean;
}

export interface OptionsProps {
  onChange: (opt: RendererOptions)=>void;
  defaultValues: RendererOptions;
}

type RadioButtonVariants = "showInnerOrOuterLabel" | "showPositionLabel" | "showVerticesIndexLabel";

export const Options: React.FC<OptionsProps> = (props) => {
  const [showInnerOrOuterLabel,setShowInnerOrOuterLabel] = useState<boolean>(props.defaultValues.showInnerOrOuterLabel);
  const [showPositionLabel,setShowPositionLabel] = useState<boolean>(props.defaultValues.showPositionLabel);
  const [showVerticesIndexLabel,setShowVerticesIndexLabel] = useState<boolean>(props.defaultValues.showVerticesIndexLabel);

  const handleChange = (variants: RadioButtonVariants) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (variants) {
        case 'showInnerOrOuterLabel':
          setShowInnerOrOuterLabel(event.target.checked);
          break;
        case 'showPositionLabel':
          setShowPositionLabel(event.target.checked);
          break;
        case 'showVerticesIndexLabel':
          setShowVerticesIndexLabel(event.target.checked);
          break;
      }
    };
  }

  useEffect(() => {
    props.onChange({showInnerOrOuterLabel, showPositionLabel, showVerticesIndexLabel})
  },[showInnerOrOuterLabel,showPositionLabel,showVerticesIndexLabel]);


  return (
    <Card>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">ラベル設定</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={showInnerOrOuterLabel} onChange={handleChange('showInnerOrOuterLabel')} name="内外のラベルを表示するか" />
            }
            label="内外を表示するか"
          />
          <FormControlLabel
            control={
              <Checkbox checked={showPositionLabel} onChange={handleChange('showPositionLabel')} name="座標を表示するか" />
            }
            label="座標を表示するか"
          />
          <FormControlLabel
            control={
              <Checkbox checked={showVerticesIndexLabel} onChange={handleChange('showVerticesIndexLabel')} name="頂点番号を表示するか" />
            }
            label="頂点番号を表示するか"
          />
        </FormGroup>
      </FormControl>
    </Card>
  )
}
