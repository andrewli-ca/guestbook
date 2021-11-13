import { Fragment } from 'react';
import { Spinner } from './Spinner';

function Button({ isLoading, children, ...props }) {
	return (
		<button {...props}>
			{isLoading ? (
				<Fragment>
					<span style={{ marginRight: '12px' }}>Loading</span>
					<Spinner />
				</Fragment>
			) : (
				children
			)}
		</button>
	);
}

export { Button };
