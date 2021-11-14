import { Fragment } from 'react';

function Textarea({ name, value, onChange, placeholder, ...props }) {
	return (
		<Fragment>
			<textarea
				name={name}
				rows="4"
				cols="50"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
			<div style={{ fontSize: '14px', marginTop: '16px', color: '#989898' }}>
				<span style={value.length > 140 ? { color: 'red' } : {}}>
					{value.length}
				</span>
				<span style={{ margin: '0 4px' }}>/</span>
				<span>140</span>
			</div>
		</Fragment>
	);
}

export { Textarea };
