import { useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const SearchForm = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState('')
	const searchInputRef = useRef()

	const handleSubmit = async e => {
		e.preventDefault()

		if (!searchInput.length) {
			return
		}
		onSearch(searchInput)
	}

	// react to changes in our page state
	useEffect(() => {
		searchInputRef.current.focus()
	}, [])

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup >
				<Form.Control
					aria-label="Search"
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Search movie"
					ref={searchInputRef}
					required
					type="text"
					value={searchInput}
				/>
				<Button className='search-button' type="submit" disabled={!searchInput.length}>Search</Button>
			</InputGroup>
		</Form>
	)
}

export default SearchForm

