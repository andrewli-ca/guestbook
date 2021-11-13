function Textarea({ name, value, onChange, placeholder }) {
	return (
		<textarea
			name={name}
			rows="4"
			cols="50"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

export { Textarea };
