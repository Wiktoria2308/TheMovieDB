import { useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import {BiSearch} from 'react-icons/bi'

const SearchForm = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState('')
	const searchInputRef = useRef()

	const handleSubmit = async e => {
		e.preventDefault()

		if (!searchInput.length) {
			return
		}
		onSearch(searchInput)
		setSearchInput('')
		searchInputRef.current.blur(); //remove focus after submitting the form
	}

	// react to changes in our page state
	useEffect(() => {
		searchInputRef.current.focus()
	}, [])

	return (
		<Form onSubmit={handleSubmit} className='search-form'>
			<InputGroup >
			<Button className='search-button' type="submit"><BiSearch/></Button>
				<Form.Control
					className='search-input'
					aria-label="Search"
					onChange={e => setSearchInput(e.target.value)}
					placeholder="Search movies, TV-series, people..."
					ref={searchInputRef}
					required
					type="text"
					value={searchInput}
				/>
			</InputGroup>
		</Form>
	)
}

export default SearchForm

