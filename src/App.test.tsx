import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('app', () => {
	it('renders the NTodo title', () => {
		render(
			<HashRouter>
				<App />
			</HashRouter>,
		)
		expect(screen.getByText('NTodo')).toBeInTheDocument()
	})
})
