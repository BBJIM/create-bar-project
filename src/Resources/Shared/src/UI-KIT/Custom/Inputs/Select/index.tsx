import React from 'react';
import styled from 'styled-components';
import Input from '../Input';
import { OptionProps, SelectProps } from '../Input/InputTypes';

const Option = styled.option``;

// IF YOU WANT TO HAVE A NICE UI SELECT MAKE YOUR OWN - default select is not great

const Select = ({ options, ...rest }: SelectProps) => {
	return (
		<Input as='select' {...rest}>
			{options.map(({ value: optionValue, label, ...restProps }: OptionProps) => {
				return (
					<Option key={`${optionValue}_${label}`} value={optionValue} {...restProps}>
						{label}
					</Option>
				);
			})}
		</Input>
	);
};

export default Select;
