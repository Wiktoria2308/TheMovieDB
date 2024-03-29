import Button from 'react-bootstrap/Button'

const Pagination = ({ page, numPages, hasPreviousPage, onPreviousPage, hasNextPage, onNextPage }) => {
	return (
		<div className="pagination d-flex align-items-center mt-5 mb-5">
			<div className="previous-page">
				<Button
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="primary"
				>Previous Page</Button>
			</div>

			<div className="current-page">Page {page}/{numPages}</div>

			<div className="next-page">
				<Button
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="primary"
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination
